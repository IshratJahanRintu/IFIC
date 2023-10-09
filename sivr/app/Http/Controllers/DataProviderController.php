<?php

namespace App\Http\Controllers;

class DataProviderController extends DataRequestController
{
    public function getUserType($cli)
    {
        $api = GET_USER_TYPE_API;
        $this->params = json_encode(array($cli, $api));
        $this->method = CALL_EXTERNAL_API;
        $this->getResponse(true);
        if (is_array($this->responseData) && isset($this->responseData[0][USER_TYPE_KEY])) {
            return $this->responseData[0][USER_TYPE_KEY];
        }
        return null;
    }

    public function generatePIN($paramArray)
    {
        $this->params = json_encode($paramArray); //array($cli, $plan, $ivr_id, $auth_code, $ip, $sessionId, $sendStatus, $pageId)
        $this->method = PIN_GENERATE_FUNCTION;
        $this->getResponse();
        if ($this->responseData == 1) {
            return true;
        }
        return false;
    }

    public function sendSms($cli, $text)
    {
        $did = '';
        $this->params = json_encode(array($cli, $did, $text));
        $this->method = SEND_SMS_FUNCTION;
        $this->getResponse();
        if ($this->responseData->res == "SUCCESS") {
            return true;
        }
        return false;
    }

    public function getUser($cli, $pin)
    {
        $this->params = json_encode(array($cli, $pin));
        $this->method = GET_USER_FUNCTION;
        $this->getResponse(true);

        if ($this->responseData == 0) {
            return null;
        }
        return reset($this->responseData);
    }

    public function getUserAuthLinkByCli(...$data)
    {

        $this->params = json_encode([$data],true);
        $this->method = GET_LOGIN_GENERATE_CODE;
        $this->getResponse(true);
        if ($this->responseData == 0) {
            return null;
        }
        return $this->responseData ;
    }

    public function  getSystemRequestLimit($data = null)
    {
        $this->params = json_encode(array($data));
        $this->method = SYSTEM_REQUEST_LIMIT_FUNCTION;
        $this->getResponse(true);
        if ($this->responseData == 0) {
            return null;
        }
        return reset($this->responseData);
    }
    public function  getSystemThrottle(...$data)
    {
        $this->params = json_encode([$data],true);
        $this->method = THROTTLE_FUNCTION;
        $this->getResponse(true);
        if ($this->responseData == 0) {
            return null;
        }
        return reset($this->responseData);
    }

    public function getUserFromAuthCode($authCode, $cli)
    {

        $this->params = json_encode(array($authCode, $cli));
        $this->method = GET_USER_FROM_AUTH_CODE_FUNCTION;
        $this->getResponse(true);
        if ($this->responseData == 0) {
            return null;
        }
        
        return reset($this->responseData);
    }

    public function getDefaultAction($ivrId)
    {
        $this->params = json_encode(array($ivrId));
        $this->method = GET_DEFAULT_ACTION_FUNCTION;
        $this->getResponse(true);
        if ($this->responseData == 0) {
            return null;
        }
        return reset($this->responseData);
    }

    public function getFunctionName($action)
    {
        $this->params = json_encode(array($action));
        $this->method = GET_FUNCTION_NAME_FROM_ACTION;
        $this->getResponse();
        if ($this->responseData == 0) {
            return null;
        }
        return reset($this->responseData)->function;
    }

    public function getDefaultPageId($ivrId)
    {
        $this->params = json_encode(array($ivrId));
        $this->method = GET_DEFAULT_PAGE_ID;
        $this->getResponse();
        if (!empty($this->responseData)) {
            return $this->responseData;
        }
        return null;
    }

    public function getPageIdFromButton($buttonId)
    { 
        $this->params = json_encode(array($buttonId));
        $this->method = GET_PAGE_ID_FROM_BUTTON;
        $this->getResponse(); 
        //HelpersController::generateApiRequestResponseLog ([$this->params, $this->method,$this->responseData->$buttonId],'', __FILE__ , __LINE__);
        if (!empty($this->responseData)) {
            return $this->responseData;
        }
        return null;
    }

    public function getNavigationPage($navigationType)
    {
        $this->params = json_encode(array($navigationType));
        $this->method = GET_NAVIGATION_PAGE;
        $this->getResponse(true);
        if (is_array($this->responseData)) {
            return reset($this->responseData);
        }
        return null;
    }

    public function getPageData($pageId)
    {
        $this->params = json_encode(array($pageId));
        $this->method = GET_PAGE_DATA_FROM_PAGE_ID;
        $this->getResponse(true);
        if (is_array($this->responseData)) {
            return $this->responseData;
        }
        return null;
    }

    public function getPageElements($pageId)
    {
        $this->params = json_encode(array($pageId));
        $this->method = GET_PAGE_ELEMENTS_FROM_PAGE_ID;
        $this->getResponse(true);
        if (is_array($this->responseData)) {
            return $this->responseData;
        }
        return null;
    }

    public function getApiResult($cli, $callId, $apiUrl, $inputData = array(), $cacheKey = null)
    {


        $url = str_replace("<CLI>", "880" . $cli, $apiUrl);
        $url = str_replace("<CALLID>", $callId, $url);
        if (!empty($inputData) && $inputData != '""') {
            $inputData = json_decode($inputData, true);
            if (!empty($inputData)) {
                foreach ($inputData as $key => $value) {
                    $url = str_replace("<" . $key . ">", $value, $url);
                }
            }
        }
        $url = $this->getUrlFromCache($url, $cacheKey);

        $this->params = json_encode(array($cli, $callId, $url));
        $this->method = EXTERNAL_API_CALL;
        HelpersController::generateApiRequestResponseLog($this->params,$this->method,__FILE__,__LINE__);
        $this->getResponse(true);
//        dd($this->params , $this->method);
//        var_dump($url);
//        var_dump($this->responseData);
//        die;
        if (is_array($this->responseData)) { return $this->responseData; }
        return null;
    }

    private function getUrlFromCache($url, $cacheKey)
    {
        $cache = new CacheController();
        while (true) {
            $start = strpos($url, "<");
            if (!$start) return $url;
            $end = strpos($url, ">");
            if (!$end) return $url;
            $length = $end - $start - 1;
            $name = substr($url, $start + 1, $length);

            $value = $cache->getCacheData($name . $cacheKey);
            $url = str_replace("<" . $name . ">", "$value", $url);
        }
    }

    public function getComparingData($elementId)
    {
        $this->params = json_encode(array($elementId));
        $this->method = GET_COMPARING_DATA;
        $this->getResponse(true);
        if (is_array($this->responseData)) {
            return $this->responseData;
        }
        return null;
    }

    public function getApiKeyData($elementId)
    {
        $this->params = json_encode(array($elementId));
        $this->method = GET_API_KEY_DATA;
        $this->getResponse(true);
        if (is_array($this->responseData)) {
            return $this->responseData;
        }
        return null;
    }

    public function getElementsCalculations($elementId)
    {
        $this->params = json_encode(array($elementId));
        $this->method = GET_API_CALCULATION_DATA;
        $this->getResponse(true);
        if (is_array($this->responseData)) {
            return $this->responseData;
        }
        return null;
    }

    public function getBulletinMsg()
    {
        $this->params = json_encode(array());
        $this->method = GET_BULLETIN_MSG;
        $this->getResponse(true);
        if (is_array($this->responseData)) {
            $this->responseData = reset($this->responseData);
            return $this->responseData["description"];
        }
        return null;
    }

    public function getDynamicPageData($elementId)
    {
        $this->params = json_encode(array($elementId));
        $this->method = GET_DYNAMIC_PAGE_DATA;
        $this->getResponse(true);
        //HelpersController::generateApiRequestResponseLog ('getDynamicPageData',$this->responseData , __FILE__ , __LINE__);
        if (is_array($this->responseData)) {
            return $this->responseData;
        }
        return null;
    }

    public function setLogoutType($sessionId, $type, $timeInIvr)
    {
        $this->params = json_encode(array($sessionId, $type, $timeInIvr));
        $this->method = SET_LOGOUT_TYPE;
        $this->getResponse(true);
        if ($this->responseData == 1) {
            return true;
        }
        return false;
    }

    public function getBlogPageData($slug)
    {
        $this->params = json_encode(array($slug));
        $this->method = get_BLOG_DATA;
        
        $this->getResponse(true);
        //HelpersController::generateApiRequestResponseLog([$this->params,$this->method],$this->responseData,__FILE__, __LINE__);
        if (is_array($this->responseData)) {
            return $this->responseData;
        }
        return null;
    }


    

}
