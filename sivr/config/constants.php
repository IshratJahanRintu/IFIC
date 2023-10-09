<?php

define("VIVR_TOKEN_ISSUER", "vivr.web");

define("DATA_PROVIDER_URL", "http://192.168.11.220/ific_vivr_data_provider/vivr_data_response.php");
// define ( 'DATA_PROVIDER_URL' , 'http://192.168.1.187/ific_vivr_data_provider/vivr_data_response.php' );
define("REQUEST_DOMAIN","https://vivr.ificbankbd.com");
define("GET_USER_TYPE_API", "SXML:CBS-TYPE:CLI=<CLI>");
define("GET_USER_BY_PHONE_API", "HTTP:MWCUDEBP:CLI=<CLI>,CALLID=<CALLID>");
define("CALL_EXTERNAL_API", "external_api_call"); 
define("LOG_LOCATION",'');
define("PIN_GENERATE_FUNCTION", "generatePIN");
define("SEND_SMS_FUNCTION", "SendSMS");
define("GET_USER_FUNCTION", "checkUser");
define("GET_DEFAULT_ACTION_FUNCTION", "getDefaultAction");
define("GET_USER_FROM_AUTH_CODE_FUNCTION", "getVIVRData");
define ( 'GET_LOGIN_GENERATE_CODE' , 'getIVRGeneratedLink' );
define("VIVR_LOG_FUNCTION", "vivrLog");
define("STORE_CUSTOMER_JOURNEY_FUNCTION", "logCustomerJourney");
define("GET_FUNCTION_NAME_FROM_ACTION", "getFunctionOfAction");
define("GET_DEFAULT_PAGE_ID", "getDefaultPageID");
define("GET_PAGE_ID_FROM_BUTTON", "getPageIdFromButton");
define("GET_PAGE_DATA_FROM_PAGE_ID", "getPageFromPageId");
define("GET_PAGE_ELEMENTS_FROM_PAGE_ID", "getPageElementsFromPageId");
define("EXTERNAL_API_CALL", "external_api_call");
define("GET_COMPARING_DATA", "getComparingData");
define("GET_API_KEY_DATA", "getElementsApiKeyData");
define("GET_API_CALCULATION_DATA", "getElementCalculationData");
define("SAVE_CUSTOMER_FEEDBACK", "iceFeedback");
define("UPDATE_VIVR_LOG", "updateVivrLog");
define("LOG_VIVR_JOURNEY", "logVivrJourney");
define("GET_BULLETIN_MSG", "getBulletinMessage");
define("GET_DYNAMIC_PAGE_DATA", "getDynamicPageData");
define("SET_LOGOUT_TYPE", "setLogoutType");
define("get_BLOG_DATA", "vivrBlogPageBySlug");

define("PIN_SMS_TEXT", "Your Smart IVR Login PIN is : ");
define("USER_TYPE_KEY", "bcsPaymentMode");

define("VIVR_MODULE_TYPE", "VI");
define("VIVR_ONLY_MODULE_SUBTYPE", "IO");
define("WEB_SOURCE", "W");
define("IVR_SOURCE", "I");

define("PREPAID", "prepaid");
define("POSTPAID", "postpaid");
define("PREPAID_IVR", "AB");
define("POSTPAID_IVR", "AC");

define("IVR_ID","AU");

define("SESSION_PREFIX_LENGTH", 6);
define("LOGIN_DURATION", 3600);


define("ENGLISH", "EN");
define("BENGALI", "BN");
define("SOUND_ON", "on");
define("SOUND_OFF", "off");
define("AUDIO_FILE_PATH", "audio/");
define("GREETINGS_AUDIO_EN", "1_Welcome_to_City_Bank_EN.wav");
define("GREETINGS_AUDIO_BN", "1_Welcome_to_City_Bank_BN.wav");

define("DEFAULT_ACTION", "nav");
define("HOME_BUTTON_VALUE", "h");
define("PREVIOUS_BUTTON_VALUE", "p");
define("HOME_PAGE", "main_page");
define("PREVIOUS_PAGE", "previous_page");


define("ELEMENT_TYPE_PARAGRAPH", "paragraph");
define("ELEMENT_TYPE_BUTTON", "button");
define("ELEMENT_TYPE_TABLE", "table");
define("ELEMENT_TYPE_HYPERLINK", "a");
define("ELEMENT_TYPE_COMPARE_API", "compareApi");
define("ELEMENT_TYPE_INPUT", "input");
define("DROPDOWN_TYPE_INPUT", "select");
define("VISIBLE", "Y");
define("NOT_VISIBLE", "N");

define("DYNAMIC_TEXT", "##");

define("ENGLISH_WEB_KEY", "web_en");
define("BENGALI_WEB_KEY", "web_bn");

define("STATIC_TABLE_KEY", "static");
define("DYNAMIC_TABLE_KEY", "key");
define ('DYNAMIC_TABLE_VERTICAL' , 'daynamicvertical' );
define ('STATIC_HORIZONTAL_TYPE' , 'SHT' );
define ('DYNAMIC_HORIZONTAL_TYPE' , 'DHT' );
define ('DYNAMIC_VERTICAL_TYPE' , 'DVT' );

define("TABLE_HEADING", "table_heading");
define("BENGALI_TABLE_HEADING", "heading_bn");
define("ENGLISH_TABLE_HEADING", "heading_en");
define("BENGALI_TABLE_ROW", "table_row_data_bn");
define("ENGLISH_TABLE_ROW", "table_row_data_en");
define("TABLE_DATA_KEY", "responseData");

define("CUSTOMER_FEEDBACK_YES", "Y");
define("CUSTOMER_FEEDBACK_NO", "N");
define("GET_NAVIGATION_PAGE", "getNavigationPage");

define("YES", "Y");
define("NO", "N");

define("TASK_NAVIGATION", "nav");
define("TASK_COMPARE", "comp");

define("COMPARISON_EQUAL", "=");
define("COMPARISON_NOT_EQUAL", "!=");
define("COMPARISON_GREATER_THAN", ">");
define("COMPARISON_GREATER_THAN_EQUAL", ">=");
define("COMPARISON_LESS_THAN", "<");
define("COMPARISON_LESS_THAN_EQUAL", "<=");

define("SET_VALUE", "SV");
define("SEND_OTP", "SO");
define("REG_CLI",'R_CLI');
define("CHECK_OTP", "CO");
define("SET_VALUE_COMPARISON_EQUAL", "SVE");
define("BACK_NODE_KEY", "backNodePageID");
define("SECOND_LEVEL_VERIFICATION", "SLV");
define("LEVEL_VERIFICATION_CLI_PREFIX", "880");
define("SECOND_LEVEL_VERIFICATION_ID", "1672719978");

define("ADDITION", "+");
define("SUBTRACTION", "-");
define("MULTIPLICATION", "*");
define("DIVISION", "/");

define("DEFAULT_PAGE", "1669022229");
define("DEFAULT_PAGE_CONVENTIONAL", "1669022229");
define("DEFAULT_PAGE_ISLAMIC", "1669022229");
define ( 'IVR_TYPE_ISLAMIC','AB' );
define ( 'IVR_TYPE_CONVENTIONAL','AB' );

define("TYPE_HOME_MENU",'HM');
define ("TYPE_SUB_MENU", 'SM' );

define("LAST_REQUESTED_PAGE", "lastRequestedPage");
define("REQUEST_COUNT", "requestCount");
define("MAX_REQUEST_COUNT", "2");
define("INPUT_ERROR_PAGE", "ierr");

define("CLI_OTP_LIMIT_24_HOUR", "10");
define("CLI_OTP_LIMIT_90_SECOND","1");
define("IP_OTP_LIMIT_24_HOUR", "250");
define("IP_OTP_LIMIT_90_SECOND", "5");
define ('SYSTEM_REQUEST_LIMIT',50000);
define ( 'SYSTEM_REQUEST_LIMIT_FUNCTION' ,'systemRequetLimit');
define ( 'THROTTLE_FUNCTION' ,'throttleFunction');

function isJson($string)
{
    json_decode($string);
    return (json_last_error() == JSON_ERROR_NONE);
}


function getDateTime($timestamp)
{
    if ($timestamp == null) return '';
    $timestamp = str_replace('"', '', $timestamp);
    $format = "d/m/Y H:i:s";
    return date($format, strtotime($timestamp));
}

function formatBytes($bytes, $precision = 2)
{
    if(!ctype_digit($bytes)){
        return null;
    }
    $bytes = intval($bytes);
    $units = array('B', 'KB', 'MB', 'GB', 'TB');

    $bytes = max($bytes, 0);
    $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
    $pow = min($pow, count($units) - 1);

    $bytes /= pow(1024, $pow);

    return round($bytes, $precision) . ' ' . $units[$pow];
}

function expand_num($num)
{
    if ($num > 99) {
        if ($num > 999) {
            $T = floor($num / 1000);
            $num -= $T * 1000;
        }
        if ($num > 99) {
            $H = floor($num / 100);
            $num -= $H * 100;
        }
    }
    $prompt = '';
    $N = $num;
    if ($T) $prompt .= $T . ',thousand,';
    if ($H) $prompt .= $H . ',hundred,';
    if ($N) $prompt .= $N . ',';
    return $prompt;
}

function read_amount($balance, $param)
{
    $bug = 'dollar';
    $cent = 'cent';
    #$balance = str_replace(',', '', $balance);
    $balance = $balance + 0;
    $balance = sprintf("%.02f", $balance);

    list($num, $dec) = explode('.', $balance);
    $param = explode(',', strtoupper($param));

    # multi-currency file; dollar, dollar1, dollar2 etc
    if (strlen($param[0]) == 2) {
        $dollar_suffix = substr($param[0], 1);
        $bug .= $dollar_suffix;
        $cent .= $dollar_suffix;
    }
    if ($balance < 0) {
        if (in_array('SIGNED', $param)) $negetive = 1;
        $num *= -1;
    }
    if ($num > 1) $bug .= 's';

    if (in_array('MILLION', $param)) {
        # 1,000,000,000,000
        if ($num > 999999999) {
            $B = floor($num / 1000000000);
            $num -= $B * 1000000000;
        }
        if ($num > 999999) {
            $M = floor($num / 1000000);
            $num -= $M * 1000000;
        }
    } else {
        # 1000,00,00,00,000
        if ($num > 9999999) {
            $C = floor($num / 10000000);
            $num -= $C * 10000000;
        }
        if ($num > 99999) {
            $L = floor($num / 100000);
            $num -= $L * 100000;
        }
    }

    if ($num > 999) {
        $T = floor($num / 1000);
        $num -= $T * 1000;
    }
    $N = $num;

    $prompt = '';

    if ($B) $prompt .= expand_num($B) . 'billion,';
    if ($M) $prompt .= expand_num($M) . 'million,';
    if ($C) $prompt .= expand_num($C) . 'crore,';
    if ($L) $prompt .= $L . ',lac,';
    if ($T) $prompt .= expand_num($T) . 'thousand,';
    if ($N) $prompt .= expand_num($N);
    if (!$prompt) $prompt = '0,';
    if ($negetive) $prompt = 'negetive,' . $prompt;

    if (in_array('POINT', $param)) {
        if ($dec > 0) {
            $prompt .= 'point,' . substr($dec, 0, 1) . ',' . substr($dec, -1) . ',';
        }
        $prompt .= $bug;
    } else {
        $prompt .= $bug;
        $dec = $dec + 0;
        if ($dec > 0) {
            if ($dec > 1) $cent .= 's';
            $prompt .= ',and,' . $dec . ',' . $cent;
        }
    }

    return $prompt;
}

function read_number($number, $format = '')
{
    $len = strlen($number);
    $shift = 1;
    for ($i = 0; $i < $len; $i++) {
        if (strlen($prompt) > 0) $prompt .= ',';
        $prompt .= substr($number, $i, 1);
        if (substr($format, $i + $shift, 1) == '-') {
            $prompt .= ',blank1sec';
            ++$shift;
        }
    }
    return $prompt;
}

function read_value($value = '', $param = '')
{
    error_reporting(0);
    $value = explode(' ', trim($value));
    $multi_prompts = '';
    foreach ($value as $var) {
        $prompt = '';
        $var = trim($var);

        $var = str_replace(',', '', $var);
        if (strlen($var) == 0) $var = 0;
        if (is_numeric($var)) {
            $data_type = substr($param, 0, 1);
            if ($data_type == '$') $prompt = read_amount($var, $param);
            else $prompt = read_number($var, $param);
        } else {
        }
        if ($prompt != '') {
            if ($multi_prompts != '') $multi_prompts .= ',blank1sec,';
            $multi_prompts .= $prompt;
        }
    }

    return $multi_prompts;
}

function sendSMS($text)
{
    $cacheKey = \Illuminate\Http\Request::capture()->request->get('key');
    $cache = new App\Http\Controllers\CacheController();
    $cli = $cache->getCacheData("cli" . $cacheKey);
    $dataProvider = new App\Http\Controllers\DataProviderController();
    $dataProvider->sendSms($cli, $text);
}

function getTransactionMode($mode)
{
    if ($mode == "D") {
        return "Debit";
    } else if ($mode == "C") {
        return "Credit";
    }
    return $mode;
}
