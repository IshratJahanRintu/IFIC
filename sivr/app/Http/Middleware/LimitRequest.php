<?php

namespace App\Http\Middleware;

use App\Http\Controllers\DataProviderController;
use Closure;

class LimitRequest
{
    public function handle ( $request , Closure $next , $guard = null )
    {

        $requestObj = new DataProviderController();
        $info = $requestObj->getSystemRequestLimit ( null);
        if ( SYSTEM_REQUEST_LIMIT >= $info['total']) {
            return $next( $request );
        }
        else {
            return response () -> json ( [
                 'error' => 'System Request Limit is over.'
             ] , 401 );
        }


    }
}
