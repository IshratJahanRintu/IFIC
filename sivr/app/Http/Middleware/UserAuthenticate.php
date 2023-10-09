<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Illuminate\Support\Facades\Cache;

class UserAuthenticate
{
    public function handle($request, Closure $next, $guard = null)
    {
        
        
        $token = $request->bearerToken();
        if (empty($token)) $token = $request->input('token');
        if (!$token) {
            return response()->json([
                                        'error' => 'Token not provided.'
                                    ], 401);
        }
        try {
            $credentials = JWT::decode($token, env('JWT_SECRET'), ['HS256']);
        } catch (ExpiredException $e) {
            //function to delete the expired user row
            dd($e->getMessage());
            return response()->json([
                                        'error' => 'Provided token is expired.'
                                    ], 401);
        } catch (Exception $e) {
            return response()->json([
                                        'error' => $e
                                    ], 400);
        }
        // Now let's put the user in the request class so that you can grab it from there
        $key = $request->input('key');
        if (!ctype_digit($key)) {
            return response()->json([
                                        'error' => 'Provided data is not valid.'
                                    ], 400);
        }
        $tokenData = Cache::get("tokenData" . $key);
        if ($token != $tokenData) {
            return response()->json([
                                        'error' => 'Provided token is not valid.'
                                    ], 401);
        }
        $totalRequest = Cache::get("requestAmount" . $key);
        if ($totalRequest > IP_OTP_LIMIT_24_HOUR) {
            return response()->json(['error' => 'Too Many Requests'], 429);
        }
        $usageDuration = time() - Cache::get("startTime" . $key);
        $remainingTime = LOGIN_DURATION - $usageDuration;
        if ($usageDuration == 0) $usageDuration = 1;
        if (($totalRequest / $usageDuration) > 1) {
            return response()->json(['error' => 'Too Many Requests'], 429);
        }
        Cache::put("requestAmount" . $key, $totalRequest + 1, $remainingTime);
        //decode user input from encode js part
        // if($request->userInput){
        //     $userInputList = str_split($request->userInput, 5);
        //     unset($userInputList[1]);
        //     $requestInput = implode("",$userInputList);
        //     $userInput = base64_decode($requestInput,true);
        //     $request->merge(['userInput' => $userInput]);
        // }
        // if(isset($request->data)){
        //     $requestData = $this->decrypt($request->data);
        //     if(is_array($requestData)){
        //         $request->merge($requestData);
        //     }
        //     $request->except(['data']);
        // }
        return $next($request);
    }

    private function decrypt($inputData) {
        $encryptedText = base64_decode($inputData);
        $success = openssl_private_decrypt($encryptedText, $result, "-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----");
	return json_decode($result,true);
}
    
}