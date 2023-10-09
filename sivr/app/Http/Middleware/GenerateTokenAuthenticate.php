<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Illuminate\Support\Facades\Cache;

class GenerateTokenAuthenticate
{
    public function handle ( $request , Closure $next , $guard = null )
    {
	
        $token = $request -> bearerToken ();
        if ( empty( $token ) ) $token = $request -> input ( 'token' );
        if ( ! $token ) {
            return response () -> json ( [
                 'error' => 'Token not provided.'
             ] , 401 );
        }
        $uid   = "6993a6dc90596c7b1f74fd39fa5615cf";
        $aud = VIVR_TOKEN_ISSUER;
        $credentials = JWT ::decode ( $token , env ( 'JWT_SECRET' ) , [ 'HS256' ] );
        if ( $credentials -> uid == $uid && $credentials -> iss == 'vivr.channel' && $credentials -> aud == $aud ) {
            return $next( $request );
        }
        else {
            return response () -> json ( [
                 'error' => 'Token is not valid.'
             ] , 401 );
        }


    }
}
