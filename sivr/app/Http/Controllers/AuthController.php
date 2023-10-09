<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    private $user;
    private $userFactory;
    private $jwtTokenObject;
    private $cacheKey;
    private $ip;

    public function __construct ()
    {
        $this->dataProvider    = new DataProviderController();
        $this->dataLogger      = new DataLogController();
        $this->responseManager = new ResponseDataController();
        $this->cache           = new CacheController();
        $this->response        = response ();
    }

    /**
     * $this->userFactory get user Factory Data from Factrory controller via Phone number
     * $this->user  set user data
     * @return Void
     */
    private function setUser ( $cli )
    {
        $this->userFactory = new UserFactoryController( $cli );
        $this->user        = $this->userFactory->getUser ();
    }

    /**
     * This method use for login with phone number
     * $this->userFactory get user Factory Data from Factory controller via Phone number
     * @param Request $request
     * @return \Illuminate\Http\Response
     * @throws \Illuminate\Validation\ValidationException
     */

    public function loginWithPhone ( Request $request )
    {
        $this->validate ( $request , [
            'cli' => 'required|numeric|digits:10'
        ] );

        $cli      = $request->input ( 'cli' );
        $this->ip = $request->ip ();

        if ( $this->generatePin ( $cli ) ) {
            return $this->responseManager->successOtpResponse ( $this->response );
        }
        return $this->responseManager->failedOtpResponse ( $this->response );
    }

    private function generatePin ( $cli )
    {
        return HelpersController::sendOtp ( $cli , $this->ip );
    }

    public function loginWithPin ( Request $request )
    {

        $this->validate ( $request , [
            'cli' => 'required|numeric|digits:10' ,
            'pin' => 'required|numeric|digits:6'
        ] );
        $cli      = $request->input ( 'cli' );
        $pin      = $request->input ( 'pin' );
        $userData = $this->dataProvider->getUser ( $cli , $pin );
        if ( $userData != null ) {
            return $this->generateTokenData ( $request , $userData , WEB_SOURCE );
        }
        return $this->responseManager->failedLoginResponse ( $this->response );
    }

    public function generateAuthLink ( Request $request )
    {
	
        $validator = Validator::make($request->all(), [

              'cli' => 'required|numeric|digits:11',
              'channel' => [ 'required' , 'max:255' , 'in:FB,Web,CRM,IVR' ]

        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $cli      = $request->input ( 'cli' );
        $channel      = $request->input ( 'channel' );
        $data = $this->dataProvider->getUserAuthLinkByCli ( $cli,'',$channel , 'AE' , 'BN' ,'');
        if ( $data != null ) {
            return $this->responseManager->successCodeGenerate ($this->response , $data );
        }
        return $this->responseManager->failedAuthLinkGenerate ( $this->response );

    }

    public function loginWithAuthCode ( Request $request )
    {

        $this->validate ( $request , [
            'authCode' => 'required|alpha_num|size:12' ,
            'cli' => 'required|numeric|digits:10'
        ] );
            
        $authCode = $request->input ( 'authCode' );
        $cli      = "0" . $request->input ( 'cli' );
        $userData = $this->dataProvider->getUserFromAuthCode ( $authCode , $cli );
        if ( $userData != null ) {
            return $this->generateTokenData ( $request , $userData , IVR_SOURCE );
        }
        return $this->responseManager->failedLoginResponse ( $this->response );

    }

    private function checkUserRegistered ( $cli , $sessionId )
    {


        $isRegistered = NO;
        $apiResult    = $this->dataProvider->getApiResult ( $cli , $sessionId , GET_USER_BY_PHONE_API );
        if ( is_array ( $apiResult ) ) {
            $apiResult = reset ( $apiResult );
            if ( ! empty( $apiResult[ 'responseCode' ] ) ) {
                if ( $apiResult[ 'responseCode' ] == 100 ) {
                    $isRegistered = YES;
                }
            }
        }
        return $isRegistered;
    }

    private function generateTokenData ( $request , $userData , $source )
    {

        
        $this->jwtTokenObject = new JwtTokenController();
        $cli                  = substr ( $userData[ 'cli' ] , - 10 );
        // $userData['session_id' ] = $cli . time ();
        $isRegistered             = $this->checkUserRegistered ( $cli , $userData[ 'session_id' ] );
        $isLogged                 = $this->dataLogger->createCustomerLogData ( $userData , $request->ip () , $source , $isRegistered );
        if ( $isLogged ) {
            $token          = $this->jwtTokenObject->getJwtAuthToken ( $userData );
            $this->cacheKey = rand ( 100000 , 999999 ) . $userData[ 'session_id' ];
            if ( $token != null ) {
                $this->setInitialCacheData ( $userData , $token );
                return $this->responseManager->successLoginResponse ( $this->response , $token , $this->cacheKey );
            }
        }
        return $this->responseManager->errorLoginResponse ( $this->response );
    }

    public function setInitialCacheData ( $userData , $token )
    {
        $key = $this->cacheKey;

        $this->cache->setCacheData ( "ivrId" . $key , $userData[ 'ivr_id' ] );
        $this->cache->setCacheData ( "cli" . $key , substr ( $userData[ 'cli' ] , - 10 ) );
        $this->cache->setCacheData ( "language" . $key , $userData[ 'language' ] );
        $this->cache->setCacheData ( "sessionId" . $key , $userData[ 'session_id' ] );
        $this->cache->setCacheData ( "sound" . $key , 'ON' );
        $this->cache->setCacheData ( "did" . $key , $userData[ 'did' ] );
        $this->cache->setCacheData ( "startTime" . $key , time () );
        $this->cache->setCacheData ( "action" . $key , DEFAULT_ACTION );
        $this->cache->setCacheData ( "firstGreeting" . $key , true );
        $this->cache->setCacheData ( "tokenData" . $key , $token );
        $this->cache->setCacheData ( LAST_REQUESTED_PAGE . $this->cacheKey , DEFAULT_PAGE );
        $this->cache->setCacheData ( REQUEST_COUNT . $this->cacheKey , "1" );
        $this->cache->setCacheData ( "requestAmount" . $this->cacheKey , "1" );
    }

    public function logout ( Request $request )
    {
        $this->validate ( $request , [
            'type' => 'alpha|size:1' ,
            'key' => 'required|numeric|digits:26'
        ] );
        $key       = $request->input ( 'key' );
        $sessionId = CacheController::getCacheData ( "sessionId" . $key );
        $startTime = CacheController::getCacheData ( "startTime" . $key );
        $timeInIvr = time () - $startTime;
        $status    = $this->dataProvider->setLogoutType ( $sessionId , $request->input ( 'type' ) , $timeInIvr );
        if ( $status ) {
            $this->cache->removeCacheData ( "tokenData" . $key );
            return $this->responseManager->successLogoutResponse ( $this->response );
        }
        return $this->responseManager->failedLogoutResponse ( $this->response );
    }

}
