<?php

namespace App\Http\Middleware;

use App\Http\Controllers\DBphp;
use App\Http\Controllers\DataProviderController;
use Closure;

class ThrottleRequestMiddleware
{
    public function handle($request, Closure $next)
    {
	
        // $ip = $request->ip();
        // $cli = $request->input('cli');
        // if (!ctype_digit($cli)) {
        //     return response()->json(['error' => 'Provided data is not valid.'], 400);
        // }
        // $requestObj = new DataProviderController();
        // $info = $requestObj->getSystemThrottle ($ip,$cli);
        // if (!$info) {
        //     return response()->json(['error' => 'Too Many Request.'], 429);
        // }
        /*$ts = time();
        $cli_ts = $ts - 90;
        $cli_ts_24 = $ts - 86400;
        $cli_ts_48 = $ts - 86400 * 2;
        $db = new DBphp();
        $upd = $db->db_update("DELETE FROM token_req_summary WHERE ip='$ip' AND tstamp < $cli_ts_48;");

        $count = $db->get_db_one("SELECT COUNT(*) AS cnt FROM token_req_summary WHERE cli='$cli' AND tstamp > $cli_ts_24 LIMIT 1;");
        if ($count > CLI_OTP_LIMIT_24_HOUR) {
            return response()->json(['error' => 'Too Many Requests'], 429);
        }

        $count = $db->get_db_one("SELECT COUNT(*) AS cnt FROM token_req_summary WHERE cli='$cli' AND tstamp > $cli_ts LIMIT 1;");
        if ($count > CLI_OTP_LIMIT_90_SECOND) {
            return response()->json(['error' => 'Too Many Requests'], 429);
        }

        $count = $db->get_db_one("SELECT COUNT(*) AS cnt FROM token_req_summary WHERE ip='$ip' AND tstamp > $cli_ts_24 LIMIT 1;");
        if ($count > IP_OTP_LIMIT_24_HOUR) {
            return response()->json(['error' => 'Too Many Requests'], 429);
        }

        $count = $db->get_db_one("SELECT COUNT(*) AS cnt FROM token_req_summary WHERE ip='$ip' AND tstamp > $cli_ts LIMIT 1;");
        if ($count > IP_OTP_LIMIT_90_SECOND) {
            return response()->json(['error' => 'Too Many Requests'], 429);
        }

        $upd = $db->db_update("INSERT INTO token_req_summary(cli,ip,tstamp) VALUES ($cli,'$ip',$ts);");*/
        $ip = $request->ip();
        $cli = $request->input('cli');
        if (!ctype_digit($cli)) {
            return response()->json([
                'error' => 'Provided data is not valid.'
            ], 400);
        }
        
        $ts = time();
        $cli_ts = $ts - 90;
        $cli_ts_24 = $ts - 86400;
        $cli_ts_48 = $ts - 86400 * 2;
        $db = new DBphp();

        $upd = $db->db_update("DELETE FROM token_req_summary WHERE ip='$ip' AND tstamp < $cli_ts_48;");

        $count = $db->get_db_one("SELECT COUNT(*) AS cnt FROM token_req_summary WHERE cli='$cli' AND tstamp > $cli_ts_24 LIMIT 1;");
        if ($count > CLI_OTP_LIMIT_24_HOUR) {
            return response()->json(['error' => 'Too Many Requests'], 429);
        }

        $count = $db->get_db_one("SELECT COUNT(*) AS cnt FROM token_req_summary WHERE cli='$cli' AND tstamp > $cli_ts LIMIT 1;");
        if ($count > CLI_OTP_LIMIT_90_SECOND) {
            return response()->json(['error' => 'Too Many Requests'], 429);
        }

        $count = $db->get_db_one("SELECT COUNT(*) AS cnt FROM token_req_summary WHERE ip='$ip' AND tstamp > $cli_ts_24 LIMIT 1;");
        if ($count > IP_OTP_LIMIT_24_HOUR) {
            return response()->json(['error' => 'Too Many Requests'], 429);
        }

        $count = $db->get_db_one("SELECT COUNT(*) AS cnt FROM token_req_summary WHERE ip='$ip' AND tstamp > $cli_ts LIMIT 1;");
        if ($count > IP_OTP_LIMIT_90_SECOND) {
            return response()->json(['error' => 'Too Many Requests'], 429);
        }

        $upd = $db->db_update("INSERT INTO token_req_summary(cli,ip,tstamp) VALUES ($cli,'$ip',$ts);");

        return $next($request);
    }
}
