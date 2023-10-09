<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HelpersController extends Controller
{

    /*public static function sendOtp($cli, $ip, $sessionId = "12345678901234567890", $pageId = null)
    {
        $authCode = rand(100000, 999999);
        $dataProvider = new DataProviderController();

        $sendStatus = NO;
        $apiUrl = "HTTP:MWOTPSMS:CALLID=<CALLID>,CLI=<CLI>,NCODE=SMOTPS,ACCT=" . $authCode;
        $smsResponse = $dataProvider->getApiResult($cli, $sessionId, $apiUrl);
        if (is_array($smsResponse)) {
            $smsResponse = reset($smsResponse);
            if (!empty($smsResponse['responseCode'])) {
                if ($smsResponse['responseCode'] == 100) {
                    $sendStatus = YES;
                }
            }
        }
        $paramsOfPin = array($cli, "", IVR_ID, $authCode, $ip, $sessionId, $sendStatus, $pageId);
        if ($dataProvider->generatePIN($paramsOfPin)) {
            return true;
        }
        return false;
    }*/

    public static function levelVerification($cli,$sessionId,$type)
    {
        $apiCli = LEVEL_VERIFICATION_CLI_PREFIX.$cli;
        if($type == SECOND_LEVEL_VERIFICATION){
            $apiUrl = "XSQL:SDF:SecondLevelVarificationCheck($apiCli,$sessionId,XXXXX)";
        }
        $dataProvider = new DataProviderController();
        $levelVerificationResponse = $dataProvider -> getApiResult ($cli,$sessionId , $apiUrl );
        if ( is_array ( $levelVerificationResponse ) ) {
            $levelVerificationResponse = reset ( $levelVerificationResponse );
            if ( ! empty( $levelVerificationResponse[ 'responseCode' ] ) ) {
                if ( $levelVerificationResponse[ 'responseCode' ] == 100 ) {
                    return true;
                }
            }
        }
        return false;
    }
    
    public static function sendOtp ( $cli , $ip , $sessionId = '12345678901234567890' , $pageId = null , $acct= null)
    {
        $authCode     = rand ( 100000 , 999999 );
        $dataProvider = new DataProviderController();

        $sendStatus  = NO;
        // $apiUrl      = 'HTTP:MWOTPSMS:CALLID=<CALLID>,CLI=<CLI>,NCODE=SMOTPS,ACC='.$acct.'AUTHCODE=' . $authCode;
        // $apiUrl      = 'HTTP:MWOTPSMS:CALLID=<CALLID>,CLI=<CLI>,NCODE=SMOTPS,ACCT='.$acct.',AUTHCODE=' . $authCode;
        $apiUrl      = 'HTTP:MWOTPSMS:CALLID=<CALLID>,CLI=<CLI>,NCODE=SMOTPS,ACCT='.$acct.',AUTHCODE=' . $authCode;
        $smsResponse = $dataProvider -> getApiResult ( $cli , $sessionId , $apiUrl );
        if ( is_array ( $smsResponse ) ) {
            $smsResponse = reset ( $smsResponse );
            if ( ! empty( $smsResponse[ 'resCode' ] ) ) {
                if ( $smsResponse[ 'resCode' ] == 000 ) {
                    $sendStatus = YES;
                }
            }
        }
        $paramsOfPin = array( $cli , '' , IVR_ID , $authCode , $ip , $sessionId , $sendStatus , $pageId );
        if ( $dataProvider -> generatePIN ( $paramsOfPin ) ) {
            return true;
        }
        return true;
    }


    public static function checkOtp($cli, $otp)
    {
        $dataProvider = new DataProviderController();
        $userData = $dataProvider->getUser($cli, $otp);
        if ($userData != null) {
            return true;
        }
        return false;
    }

    public static function arithmeticOperation($firstValue, $secondValue, $operation)
    {
        if ($operation == ADDITION) {
            return ($firstValue + $secondValue);
        } elseif ($operation == SUBTRACTION) {
            return ($firstValue - $secondValue);
        } elseif ($operation == MULTIPLICATION) {
            return ($firstValue * $secondValue);
        } elseif ($operation == DIVISION) {
            if ($secondValue != 0) return ($firstValue / $secondValue);
        }
        return false;
    }

    static function getCachedDataList()
    {
        return array(
            "ACCT",
            "CBLCC",
            "OBCC",
            "CARD",
            "CBLAC",
            "USDAMNT",
            "BDTAMNT",
            "DESCO",
            "CARBILNO",
            "MLPLNO",
            "AMN",
            "chequeNumber",
            "Fchqno",
            "Lchqno",
            "CBLACC",
            "bKashNo",
            "errorPageId",
            "errorCount"
        );
    }

    public static function clearCacheData($cacheKey)
    {
        $dataList = HelpersController::getCachedDataList();
        foreach ($dataList as $data) {
            CacheController::removeCacheData($data . $cacheKey);
        }
    }

    public static function generateApiRequestResponseLog($msg,$data,$data1,$data2)
    {
        $path = base_path () . DIRECTORY_SEPARATOR . 'log' . DIRECTORY_SEPARATOR ;
        $log = 'User: ' . $_SERVER[ 'REMOTE_ADDR' ] . ' - ' . date ( 'F j, Y, g:i a' ) . PHP_EOL .
            'Message: ' . (json_encode ($msg)) . PHP_EOL .
            'Data 1: ' . (json_encode ($data)) . PHP_EOL .
            'Data 2: ' . (json_encode ($data1)) . PHP_EOL .
            'Data 3: ' . (json_encode ($data2)) . PHP_EOL .

            '--------------------------------------------------------------------------------------' . PHP_EOL;
        //Save string to log, use FILE_APPEND to append.
        file_put_contents ( $path.'log_' . date ( 'j.n.Y' ) . '.txt' , $log, FILE_APPEND );
    }
}
