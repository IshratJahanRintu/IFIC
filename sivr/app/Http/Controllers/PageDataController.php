<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class PageDataController extends Controller
{
    private $pageId;
    private $backPageId;
    private $previousPageId;
    private $buttonId;
    private $buttonValue;
    private $ivrId;
    private $cli;
    private $language;
    private $soundStatus;
    private $action;
    private $sessionId;
    private $cacheKey;
    private $startTime;
    //    private $previousPage;
    private $pageElementsData;
    private $pageContentData;
    private $defaultPageID;
    private $ip;
    private $dynamicAudio;
    private $isReloaded;
    private $isCompareNode;
    private $userInput;
    private $moduleType;
    private $tpStatus;
    private $isUserInputValid;
    private $type;

    public function __construct()
    {
        $this->dataProvider = new DataProviderController();
        $this->dataLogger = new DataLogController();
        $this->responseManager = new ResponseDataController();
        $this->response = response();
        $this->cache = new CacheController();
        $this->pageElementsData = array();
        $this->dynamicAudio = array();
        $this->isCompareNode = false;
    }

    public function getPageData(Request $request)
    {
        
        $this->validatePageDataRequest($request);
        if ($this->isUserInputValid === false) return $this->responseManager->errorInputRequest($this->response);
        $this->setAttributesFromCache();
        if ($this->isNavigationPage()) {
            $this->pageId = $this->getPageIdFromNavigationButton();
        } else {

            if (empty($this->buttonId)) {
                if (!empty($this->previousPageId)) {
                    $this->pageId = $this->previousPageId;
                }
            } else {
                $buttonPageData = $this->dataProvider->getPageIdFromButton($this->buttonId);
                $this->pageId = $buttonPageData->{$this->buttonId}->page_id;
                //Set Back Node operation for navigation Button
                $this->backPageId = $buttonPageData->{$this->buttonId}->back_page_id;
                if($this->backPageId){
                    // need to set back page id in session for back to this page 
                    //HelpersController::generateApiRequestResponseLog('Back Page Id SET', $this->backPageId,__FILE__, __LINE__);
                    $this->setValue(BACK_NODE_KEY,$this->backPageId);
                }
            }
        }
        if (empty($this->pageId)) {
            if (in_array($this->type, ["I", "C"])) {
                $this->pageId = $this->getDefaultPageIdAfterToggle();
            } else {
                $this->pageId = $this->getDefaultPageIdByIvrType();
            }
        }
        if ($this->pageId == $this->getDefaultPageIdByIvrType()) {
            HelpersController::clearCacheData($this->cacheKey);
        } else {
            if ($this->checkRequestLimit()) {
                //                $this->pageId = $this->getDefaultPageIdByIvrType ();
            }
        }
        return $this->getPageElements();
    }

    /**
     * Get Default Page id by ivr , ivr type depend on front end parameter
     * @param string|null $type I or C
     * @return string
     * @author Protap
     * @author Rizve
     * @todo Always modification this IVR type
     *
     */
    private function getDefaultPageIdByIvrType()
    {
        if ($this->ivrId == IVR_TYPE_ISLAMIC) {
            return DEFAULT_PAGE_ISLAMIC;
        } else {
            return DEFAULT_PAGE_CONVENTIONAL;
        }
    }

    private function getDefaultPageIdAfterToggle()
    {
        if ($this->type === 'I') {
            $this->cache->setCacheData("ivrId" . $this->cacheKey, IVR_TYPE_ISLAMIC);
            $this->ivrId = IVR_TYPE_ISLAMIC;
            return DEFAULT_PAGE_ISLAMIC;
        } else {
            $this->cache->setCacheData("ivrId" . $this->cacheKey, IVR_TYPE_CONVENTIONAL);
            $this->ivrId = IVR_TYPE_CONVENTIONAL;
            return DEFAULT_PAGE_CONVENTIONAL;
        }
    }

    private function isNavigationPage()
    {
        return in_array($this->buttonValue, array(PREVIOUS_BUTTON_VALUE, HOME_BUTTON_VALUE));
    }

    private function validatePageDataRequest($request)
    {
        $this->validate($request, [
            'buttonId' => 'numeric',
            'buttonValue' => 'alpha_num',
            'action' => 'alpha',
            'previousPage' => 'numeric',
            'userInput' => 'JSON',
            'sound' => 'alpha|min:2|max:3',
            'language' => 'alpha|size:2',
            'key' => 'required|numeric|digits:26'
        ]);
        
        $this->buttonId = $request->input('buttonId');
        $this->buttonValue = $request->input('buttonValue');
        $this->action = $request->input('action');
        $this->previousPageId = $request->input('previousPage');
        $this->userInput = $request->input('userInput');
        $this->soundStatus = $request->input('soundStatus');
        $this->language = $request->input('sound');
        $this->cacheKey = $request->input('key');
        $this->type = $request->input('type');
        $this->ip = $request->ip();
        return $this->validateUserInputField();
    }

    private function validateUserInputField()
    {

        
        if ($this->isNavigationPage()) return;
        $this->isUserInputValid = true;
        return;
        $userData = json_decode($this->userInput, true);
        if (empty($userData)) return;
        // multiple input value item need modified
        $userInputKey = array_keys($userData);
        $userInputValue = $userData[$userInputKey[0]];
        

        //multiple input value need to modified
        if (is_numeric($userInputValue)) {
            if ($userInputValue < 0) {
                $this->isUserInputValid = false;
                return;
            }
        }


        $inputElement = null;
        $previousPageElements = $this->dataProvider->getPageElements($this->previousPageId);

        foreach ($previousPageElements as $previousPageElement) {
            if (isJson($previousPageElement['name']) && $previousPageElement['type'] == ELEMENT_TYPE_INPUT) {
                $inputElement = json_decode($previousPageElement['name'], true);
                //break part need to modify for multiple input value
                break;
            }
        }
        if (empty($inputElement)) return;
        //check data is valid or not need modify when multiple input element is comming
        if (($inputElement['name'] == $userInputKey[0]) && !(preg_match('/[\'\~`\!@#\$%\^&\*\(\)_\-\+\{\}\[\]\|;:"\<\>,\?\?\\\]/',$userInputValue)) && ($userInputValue != "")) {
            $this->isUserInputValid = true;
            return;
        }

        $this->isUserInputValid = false;
    }

    private function setAttributesFromCache()
    {
        //need to set conditions if input data is set on this class variables
        $key = $this->cacheKey;
        $this->ivrId = $this->cache->getCacheData("ivrId" . $key);
        $this->cli = $this->cache->getCacheData("cli" . $key);
        $this->sessionId = $this->cache->getCacheData("sessionId" . $key);
        $did = $this->cache->getCacheData("did" . $key);
        $this->startTime = $this->cache->getCacheData("startTime" . $key);
        if ($this->action == null) $this->action = $this->cache->getCacheData("action" . $key);
        if ($this->language == null) $this->language = $this->cache->getCacheData("language" . $key);
        if ($this->soundStatus == null) $this->soundStatus = $this->cache->getCacheData("sound" . $key);
        $this->defaultPageID = $this->dataProvider->getDefaultPageId($this->ivrId);
    }

    private function getPageIdFromNavigationButton()
    {
        if ($this->buttonValue == HOME_BUTTON_VALUE) {
            return $this->defaultPageID;
        } elseif ($this->buttonValue == PREVIOUS_BUTTON_VALUE) {
            return $this->getPreviousNavigationPageId($this->buttonId);
        }
        return null;
    }

    private function getPreviousNavigationPageId($pageId)
    {
        $pageData = $this->dataProvider->getPageData($pageId);
        $pageData = reset($pageData);
        if ($pageData['task'] != TASK_COMPARE) {
            return $pageId;
        }
        return $this->getPreviousNavigationPageId($pageData['parent_page_id']);
    }

    private function getPageElements()
    {
        $pageElements = array();
        if (!empty($this->pageId)) {

            $this->updateVivrJourneyLog();
            $this->checkDynamicPage();
            $this->checkInputErrorCount();
            //**note** get page data from api by page id
            $pageData = $this->dataProvider->getPageData($this->pageId);
            /*if($pageData[$this->pageId]['second_level_verification'] == 'Y'){
                // if second level verified then simpley pass but if second level not verified ,  then go to  varification process .
                $secondLevelVerifiactionStatus = HelpersController::levelVerification($this->cli,$this->sessionId,SECOND_LEVEL_VERIFICATION);
                if(!$secondLevelVerifiactionStatus){
                    $this->pageId = SECOND_LEVEL_VERIFICATION_ID;
                    $pageData = $this->dataProvider->getPageData($this->pageId);
                }
            }*/

            if($pageData[$this->pageId]['is_back_node'] == 'Y'){
                $this->pageId = $this->cache->getCacheData(BACK_NODE_KEY . $this->cacheKey);
                if(!$this->pageId){
                    $this->pageId = DEFAULT_PAGE;
                }
                $this->updateVivrJourneyLog();
                $this->checkDynamicPage();
                $this->checkInputErrorCount();
                $pageData = $this->dataProvider->getPageData($this->pageId);
            }
            
            
            //**note** get page Element from api by page id
            $pageElements = $this->dataProvider->getPageElements($this->pageId);
            //HelpersController::generateApiRequestResponseLog('Got Test Data'.$this->pageId,   $pageElements,__FILE__, __LINE__);
            // dd( $pageElements);
            //HelpersController::generateApiRequestResponseLog([$pageElements], __METHOD__ ,__FILE__,__LINE__);
            if (is_array($pageElements)) {
                foreach ($pageElements as $pageElement) {
                    $element = $this->getElementFromFactory($pageElement);
                    if ($element->hasError) {
                        return $this->getErrorElement();
                    }
                    if (!empty($element->dynamicAudioFiles)) {
                        $this->dynamicAudio = array_merge($this->dynamicAudio, $element->dynamicAudioFiles);
                    }
                    unset($element->hasError);
                    array_push($this->pageElementsData, $element);
                }
            }
            //HelpersController::generateApiRequestResponseLog([$pageData], __METHOD__ ,__FILE__,__LINE__);
            $this->setPageDataResponse($pageData);
            $typeInfo = $this->getPageTypeAndBankingType($this->pageId, $pageData[$this->pageId]['ivr_id']);
            $this->pageContentData->page_type = $typeInfo['page_type'];
            $this->pageContentData->bank_type = $typeInfo['bank_type'];
            //HelpersController::generateApiRequestResponseLog([$this->pageContentData], __METHOD__ ,__FILE__,__LINE__);
            return $this->responseManager->pageDataResponse($this->response, $this->pageContentData);
        }
        return $this->responseManager->pageDataResponse($this->response, $this->getErrorElement());
    }

    /**
     * Get  Page id and ivr id  for generate page type and banking type
     *
     * @param string|null $pageId
     * @param string|null $ivrId
     * @return array
     * @author Rizve
     * @author Protap
     *
     */
    private function getPageTypeAndBankingType(string $pageId, string  $ivrId)
    {
        $typeInfo['page_type'] = TYPE_HOME_MENU;
        $typeInfo['bank_type'] = IVR_TYPE_CONVENTIONAL;
        switch ($pageId) {
            case DEFAULT_PAGE_ISLAMIC:
                if ($ivrId == IVR_TYPE_ISLAMIC) {
                    $typeInfo['bank_type'] = IVR_TYPE_ISLAMIC;
                }
                break;
            case DEFAULT_PAGE_CONVENTIONAL:
                if ($ivrId == IVR_TYPE_CONVENTIONAL) {
                    $typeInfo['bank_type'] = IVR_TYPE_CONVENTIONAL;
                }
                break;
            default:
                $typeInfo['page_type'] = TYPE_SUB_MENU;
                if ($ivrId == IVR_TYPE_CONVENTIONAL) {
                    $typeInfo['bank_type'] = IVR_TYPE_CONVENTIONAL;
                } else {
                    $typeInfo['bank_type'] = IVR_TYPE_ISLAMIC;
                }
        }
        return $typeInfo;
    }

    private function getElementFromFactory($pageElement)
    {
        $elementFactory = new ElementFactoryController($pageElement, $this->cli, $this->language, $this->cacheKey);
        return $elementFactory->getElement();
    }

    private function getErrorElement()
    {
        $errorElement = new ErrorElementController($this->language);
        return $errorElement->getErrorRequestMsg();
    }

    private function updateVivrJourneyLog()
    {
        $stopTime = date("Y-m-d H:i:s");
        $timeInIvr = time() - $this->startTime;
        $logParams = array();
        $logParams['logTime'] = $stopTime;
        $logParams['fromPage'] = $this->pageId;
        $logParams['toPage'] = $this->previousPageId;
        $logParams['sessionId'] = $this->sessionId;
        $logParams['ivrId'] = $this->ivrId;
        $logParams['dtmf'] = $this->buttonValue;
        $logParams['timeInIvr'] = $timeInIvr;
        $logParams['statusFlag'] = '';
        $logParams['ip'] = $this->ip;
        if ($this->isCompareNode) {
            $logParams['dtmf'] = null;
        }
        $logParams['moduleType'] = '';
        $logParams['tpStatus'] = '';
        if (!empty($this->moduleType)) {
            $logParams['moduleType'] = $this->moduleType;
        }
        if (!empty($this->tpStatus)) {
            $logParams['tpStatus'] = $this->tpStatus;
        }
        $isVivrLogUpdated = $this->dataLogger->updateVivrLog($stopTime, $timeInIvr, $this->sessionId);
        $isLoggedCustomerJourney = $this->dataLogger->logCustomerJourney($logParams);
        $this->moduleType = null;
        $this->tpStatus = null;
        if ($isVivrLogUpdated && $isLoggedCustomerJourney) {
            return true;
        }
        return false;
    }

    private function setPageDataResponse($pageData)
    {
        $pageData = $pageData[$this->pageId];
        $pageDataResponse = new \stdClass();
        $pageDataResponse->currentPage = $this->pageId;
        $pageDataResponse->action = $pageData['task'];
        $pageDataResponse->audioFiles = $this->getAudioFiles($pageData);
        $pageDataResponse->language = $this->language;
        $pageDataResponse->pageHeading = $this->getPageHeading($pageData);
        $pageDataResponse->soundStatus = $this->soundStatus;
        $pageDataResponse->pageContent = $this->pageElementsData;
        $pageDataResponse->previousPage = $this->getNavigationPage($pageData, PREVIOUS_PAGE);
        $pageDataResponse->homePage = $this->getNavigationPage($pageData, HOME_PAGE);
        $pageDataResponse->bulletinMessage = $this->getBulletinMessage();

        $this->pageContentData = $pageDataResponse;
    }

    private function getPageHeading($pageData)
    {
        $pageHeading = array();
        $pageHeading[ENGLISH] = $pageData['page_heading_en'];
        $pageHeading[BENGALI] = $pageData['page_heading_ban'];
        return $pageHeading;
    }

    private function getAudioFiles($pageData)
    {
        $audioFiles = array();
        $greetingsAudio = $this->getGreetingsAudio();
        if ($greetingsAudio != null) {
            $audioFiles[ENGLISH][] = $greetingsAudio[ENGLISH];
            $audioFiles[BENGALI][] = $greetingsAudio[BENGALI];
        }
        $audioFromDb = null;
        $audioFromDb[ENGLISH] = $this->getDynamicAudioFiles($pageData['audio_file_en'], ENGLISH);
        $audioFromDb[BENGALI] = $this->getDynamicAudioFiles($pageData['audio_file_ban'], BENGALI);

        foreach ($audioFromDb[ENGLISH] as $audioEn) {
            $audioFiles[ENGLISH][] = !empty($audioEn) ? AUDIO_FILE_PATH . $audioEn : null;
        }
        foreach ($audioFromDb[BENGALI] as $audioBn) {
            $audioFiles[BENGALI][] = !empty($audioBn) ? AUDIO_FILE_PATH . $audioBn : null;
        }
        return $audioFiles;
    }

    private function getDynamicAudioFiles($audioFiles, $language, $audioType = 'wav')
    {
        $audioFromDb[$language] = explode(",", $audioFiles);
        if (!empty($this->dynamicAudio)) {
            $tempAudio = array_shift($audioFromDb[$language]);
            $dynamicList = null;
            foreach ($this->dynamicAudio as $audio) {
                $dynamicList[] = $language . "/" . $audio . "." . $audioType;
            }
            array_unshift($dynamicList, $tempAudio);
            $audioFromDb[$language] = array_merge($dynamicList, $audioFromDb[$language]);
        }
        return $audioFromDb[$language];
    }

    private function getGreetingsAudio()
    {
        $greetingsAudio = null;
        if ($this->cache->getCacheData('firstGreeting' . $this->cacheKey)) {
            $greetingsAudio[ENGLISH] = AUDIO_FILE_PATH . GREETINGS_AUDIO_EN;
            $greetingsAudio[BENGALI] = AUDIO_FILE_PATH . GREETINGS_AUDIO_BN;
            $this->cache->updateCacheData('firstGreeting' . $this->cacheKey, false);
        }
        return $greetingsAudio;
    }

    private function getNavigationPage($pageData, $navigationType)
    {
        if ($navigationType == PREVIOUS_PAGE) {
            if ($pageData['has_previous_menu'] != YES) {
                return null;
            }
        } elseif ($navigationType == HOME_PAGE) {
            if ($pageData['has_main_menu'] != YES) {
                return null;
            }
        }
        $navigationPageElement = $this->dataProvider->getNavigationPage($navigationType);
        if (is_array($navigationPageElement)) {
            $navigationPageElement = $this->getElementFromFactory($navigationPageElement);
        }
        $navigationPageElement->elementId = $pageData['parent_page_id'];
        unset($navigationPageElement->elementOrder);
        unset($navigationPageElement->hasError);
        return $navigationPageElement;
    }

    private function getBulletinMessage()
    {
        $bulletinMessage = null;
        $bulletinMessage = $this->dataProvider->getBulletinMsg();
        return $bulletinMessage;
    }

    private function checkDynamicPage()
    {
        $pageData = $this->dataProvider->getPageData($this->pageId);
        //HelpersController::generateApiRequestResponseLog ('checkDynamicPage', $pageData , __FILE__ , __LINE__);
        if (is_array($pageData)) {
            $pageData = reset($pageData);
            if ($pageData['page_heading_en'] == 'TIN Check') {
                $this->moduleType = "TC";
            } else if ($pageData['page_heading_en'] == 'PIN Check') {
                $this->moduleType = "PC";
            }
        } else {
            return;
        }
        if ($pageData['task'] != TASK_COMPARE) {
            return;
        }
        $this->isCompareNode = true;
        $this->checkApiCompareData();
        $this->checkDynamicPage();
    }

    private function checkApiCompareData()
    {
        
        $pageElements = $this->dataProvider->getPageElements($this->pageId);
        //HelpersController::generateApiRequestResponseLog ('checkApiCompareData', [$this->pageId,$pageElements] , __FILE__ , __LINE__);
        foreach ($pageElements as $pageElement) {
            if ($pageElement['type'] == ELEMENT_TYPE_COMPARE_API) {
                $compareResults = $this->dataProvider->getDynamicPageData($pageElement['element_id']);
                if (!empty($pageElement['data_provider_function'])) {
                    //HelpersController::generateApiRequestResponseLog ('checkCompareDataWithApi', [$pageElement, $compareResults] , __FILE__ , __LINE__);
                    return $this->checkCompareDataWithApi($pageElement, $compareResults);
                } else {
                    //HelpersController::generateApiRequestResponseLog ('checkCompareDataWithoutApi', [$pageElement, $compareResults] , __FILE__ , __LINE__);
                    return $this->checkCompareDataWithoutApi($compareResults, $pageElement);
                }
            }
        }
        $this->pageId = $this->defaultPageID;
    }

    //previous method  for setvalue

    private function checkCompareDataWithApi($pageElement, $compareResults)
    {
        $apiResult = $this->dataProvider->getApiResult($this->cli, $this->sessionId, $pageElement['data_provider_function'], $this->userInput, $this->cacheKey);
        if (!empty($apiResult)) {
            $apiResult = reset($apiResult);
            //HelpersController::generateApiRequestResponseLog ('$apiResult',$apiResult , __FILE__ , __LINE__);
            if ($this->hasMultitaskComparison($compareResults)) {
                //HelpersController::generateApiRequestResponseLog ('checkCompareDataWithApi2', $compareResults , __FILE__ , __LINE__);

                return $this->checkMultitaskComparison($pageElement, $compareResults, $apiResult);
            } else {
                foreach ($compareResults as $compareResult) {
                    //api_key , data , pageElement Name
                    //HelpersController::generateApiRequestResponseLog ('checkCompareDataWithApi3', $compareResult , __FILE__ , __LINE__);

                    $apiKey = $compareResult['api_key'];
                    $data = !empty($apiResult[$apiKey]) ? $apiResult[$apiKey] : null;
                   
                    if(isset($apiResult[$apiKey])){
                        if ($apiResult[$apiKey] === "0") $data = $apiResult[$apiKey];
                    }
                    //HelpersController::generateApiRequestResponseLog([$compareResult, $pageElement['name'], $data],$data,$pageElement['name'],__LINE__);
                    if ($this->hasApiResultMatched($compareResult, $pageElement['name'], $data)) {
                        $this->checkTinPinStatus();
                        $this->previousPageId = $this->pageId;
                        $this->pageId = $compareResult['transfer_page_id'];
                        //HelpersController::generateApiRequestResponseLog($apiKey,$data,$pageElement['name'],__LINE__);
                        if($compareResult['back_page_id']){
                            $this->backPageId = $compareResult['back_page_id'];
                            //HelpersController::generateApiRequestResponseLog('BAck page id set value with compare','',__FILE__,__LINE__);
                            $this->setValue(BACK_NODE_KEY, $this->backPageId);
                        }
                        $this->updateVivrJourneyLog();
                        return;
                    }
                }
                
            }
        }
        return $this->getCompareErrorNode($compareResults);
    }
    // private function checkCompareDataWithApi($pageElement, $compareResults)
    // {
    //     $apiResult = $this->dataProvider->getApiResult($this->cli, $this->sessionId, $pageElement['data_provider_function'], $this->userInput, $this->cacheKey);
    //     if (!empty($apiResult)) {
    //         $apiResult = reset($apiResult);
    //         if ($this->hasMultitaskComparison($compareResults)) {
    //             return $this->checkMultitaskComparison($pageElement, $compareResults, $apiResult);
    //         } else {
    //             foreach ($compareResults as $compareResult) {
    //                 $apiKey = explode(',', $compareResult['api_key']);
    //                 $pageElementName = explode(',', $pageElement['name']);
    //                 if (count($apiKey) == count($pageElementName)) {
    //                     $setValueStatus = false;
    //                     foreach ($apiKey as $k => $key) {
    //                         //Need this log for track which data is store in setvalue  
    //                         $setValueStatus = $this->formatApiMultipleDataSetValue($key, $pageElementName[$k], $compareResult, $apiResult);
    //                         HelpersController::generateApiRequestResponseLog(['apiKey' => $key, 'elementName' => $pageElementName[$k], 'status' => $setValueStatus], $compareResult, $apiResult, __LINE__);
    //                     }
    //                     HelpersController::generateApiRequestResponseLog($pageElementName, $compareResult, __FILE__, __LINE__);
    //                     if ($setValueStatus) {
    //                         $this->checkTinPinStatus();
    //                         $this->previousPageId = $this->pageId;
    //                         $this->pageId = $compareResult['transfer_page_id'];
    //                         //need to set value for back node transfer STPID
    //                         $this->updateVivrJourneyLog();
    //                         return;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     return $this->getCompareErrorNode($compareResults);
    // }

    /**
     * Set Value in cacahe . It's  work for multiple data setvalue. 
     * It's call from checkCompareDataWithApi multiple time if have multiple data
     *
     * @param string|null $explodeApiKey
     * @param string|null $explodeElementName
     * @param string|null $apiResult
     * @param array $compareResult
     * @return boolean
     * @author Rizve
     *
     */

    // private function formatApiMultipleDataSetValue($explodeApiKey, $explodeElementName, $compareResult, $apiResult)
    // {
    //     HelpersController::generateApiRequestResponseLog([$explodeApiKey, $explodeElementName, $compareResult, $apiResult], '', __FILE__, __LINE__);
    //     $data = !empty($apiResult[$explodeApiKey]) ? $apiResult[$explodeApiKey] : null;
    //     if (isset($apiResult[$explodeApiKey])) {
    //         if ($apiResult[$explodeApiKey] === "0") $data = $apiResult[$explodeApiKey];
    //     }
    //     if ($this->hasApiResultMatched($compareResult, $explodeElementName, $data)) {
    //         HelpersController::generateApiRequestResponseLog([$explodeApiKey, $explodeElementName, $compareResult, $apiResult], '', __FILE__, __LINE__);
    //         return true;
    //     }
    //     return false;
    // }

    
    private function checkCompareDataWithoutApi($compareResults, $pageElement)
    {
        foreach ($compareResults as $compareResult) {
            if ($this->hasApiResultMatched($compareResult, $pageElement['name'])) {
                $this->previousPageId = $this->pageId;
                $this->pageId = $compareResult['transfer_page_id'];
                if($compareResult['back_page_id']){
                    $this->backPageId = $compareResult['back_page_id'];
                    $this->setValue(BACK_NODE_KEY, $this->backPageId);
                }
                $this->updateVivrJourneyLog();
                return;
            }
        }
        return $this->getCompareErrorNode($compareResults);
    }
    
    /**
     * Set Value for multiple input data 
     * It's call from checkCompareDataWithoutApi means without api data set value this option .
     *
     * @param array $pageElement
     * @param array $compareResult
     * @return void
     * @author Rizve
     *
     */
    // private function checkCompareDataWithoutApi($compareResults, $pageElement)
    // {
    //     foreach ($compareResults as $compareResult) {
    //         $pageElementName = explode(',', $pageElement['name']);
    //         HelpersController::generateApiRequestResponseLog($pageElementName, $compareResult,'', __LINE__);

    //         $setValueStatus = false;
    //         foreach ($pageElementName as $k => $value) {
    //             $this->hasApiResultMatched($compareResult, $value) ? $setValueStatus = true : $setValueStatus = false;
    //         }
    //         if ($setValueStatus) {
    //             $this->previousPageId = $this->pageId;
    //             $this->pageId = $compareResult['transfer_page_id'];
    //             //need to set value for back node transfer STPID

    //             $this->updateVivrJourneyLog();
    //             return;
    //         }
    //     }
    //     return $this->getCompareErrorNode($compareResults);
    // }


    private function hasApiResultMatched($compareResult, $name, $apiResult = null)
    {
        if ($compareResult['comparison'] == COMPARISON_EQUAL) {
            return ($compareResult['key_value'] == $apiResult);
        } elseif ($compareResult['comparison'] == COMPARISON_NOT_EQUAL) {
            return ($compareResult['key_value'] != $apiResult);
        } elseif ($compareResult['comparison'] == COMPARISON_GREATER_THAN) {
            return ($compareResult['key_value'] > $apiResult);
        } elseif ($compareResult['comparison'] == COMPARISON_GREATER_THAN_EQUAL) {
            return ($compareResult['key_value'] >= $apiResult);
        } elseif ($compareResult['comparison'] == COMPARISON_LESS_THAN) {
            return ($compareResult['key_value'] < $apiResult);
        } elseif ($compareResult['comparison'] == COMPARISON_LESS_THAN_EQUAL) {
            return ($compareResult['key_value'] <= $apiResult);
        }
        //HelpersController::generateApiRequestResponseLog($compareResult, $name, $apiResult,__LINE__);
        return $this->checkPredefinedFunction($compareResult, $name, $apiResult);
    }

    private function getCompareErrorNode($compareResults)
    {
        foreach ($compareResults as $compareResult) {
            if (empty($compareResult['comparison']) && empty($compareResult['key_value'])) {
                $this->previousPageId = $this->pageId;
                $this->pageId = $compareResult['transfer_page_id'];
                //HelpersController::generateApiRequestResponseLog($compareResult,'',__FILE__,__LINE__);
                if($compareResult['back_page_id']){
                    $this->backPageId = $compareResult['back_page_id'];
                    $this->setValue(BACK_NODE_KEY, $this->backPageId);
                }
                $this->updateVivrJourneyLog();
                return;
            }
        } 
    }

    private function checkPredefinedFunction($compareResult, $name, $apiResult)
    {
        $inputData = json_decode($this->userInput, true);
        $comparison = $compareResult['comparison'];
        if ($comparison == SET_VALUE) {
            $this->moduleType = SET_VALUE;
            if ($apiResult != null) {
                return $this->setValue($name, $apiResult);
            } else {
                if (!empty($compareResult['api_key'])) {
                    $arithmeticOperation = $this->checkArithmeticOperation($compareResult['api_key']);
                    return $this->setValueOperation($arithmeticOperation, $compareResult['api_key'], $name);
                }elseif (!empty($inputData[$name])) {
                    return $this->setValue($name, $inputData[$name]);
                }
                return false;
            }
        } elseif ($comparison == SEND_OTP) {
            $this->moduleType = SEND_OTP;
            return $this->sendOtp();
        } elseif ($comparison == CHECK_OTP) {
            $this->moduleType = CHECK_OTP;
            if (!empty($inputData[$name])) {
                return $this->checkOtp($inputData[$name]);
            }
        } elseif ($comparison == SET_VALUE_COMPARISON_EQUAL) {
            $keyList = explode(",", $name);
            return $this->savedDataCompare($keyList[0], $keyList[1]);
        }elseif (!empty($inputData) && is_array($inputData)) {
            foreach($inputData as $key=>$value){
                $this->setValue($key, $value);
            }
            return true;
        }
        //HelpersController::generateApiRequestResponseLog($compareResult, $name, $apiResult,__LINE__);
        // elseif ($comparison == FIRST_LEVEL_VERIFICATION) {
            
        // }elseif ($comparison == SECOND_LEVEL_VERIFICATION) {
            
        // }
        return false;
    }

    private function setValue($name, $value)
    {
        $this->cache->setCacheData($name . $this->cacheKey, $value);
        return true;
    }

    private function sendOtp()
    {
        $soCLI = $this->cache->getCacheData(REG_CLI . $this->cacheKey);
		$acct = $this->cache->getCacheData('ACCT' . $this->cacheKey);
        return HelpersController::sendOtp(substr($soCLI,-10), $this->ip, $this->sessionId, $this->pageId, $acct);
    }

    private function checkOtp($otp)
    {
        $soCLI = $this->cache->getCacheData(REG_CLI . $this->cacheKey);
        return HelpersController::checkOtp(substr($soCLI,-10), $otp);
    }

    private function savedDataCompare($firstKey, $secondKey, $comparison = COMPARISON_EQUAL)
    {
        $firstData = $this->cache->getCacheData($firstKey . $this->cacheKey);
        $secondData = $this->cache->getCacheData($secondKey . $this->cacheKey);

        if ($comparison == COMPARISON_EQUAL) {
            return ($firstData == $secondData);
        }
        return false;
    }



    private function hasMultitaskComparison($compareResults)
    {
        $hasComparison = false;
        $hasOperation = false;
        foreach ($compareResults as $compareResult) {
            if ($compareResult['comparison'] == COMPARISON_EQUAL) $hasComparison = true;
            if ($compareResult['comparison'] == SET_VALUE) $hasOperation = true;
        }
        if ($hasComparison && $hasOperation) return true;
        return false;
    }

    private function checkMultitaskComparison($pageElement, $compareResults, $apiResult)
    {
        $transferToPageId = null;
        $hasComparisonMatch = false;
        foreach ($compareResults as $compareResult) {
            $apiKey = $compareResult['api_key'];
            $apiResultValue = !empty($apiResult[$apiKey]) ? $apiResult[$apiKey] : null;

            if ($compareResult['comparison'] == COMPARISON_EQUAL) {
                if ($compareResult['key_value'] == $apiResultValue) {
                    $transferToPageId = $compareResult['transfer_page_id'];
                    if($compareResult['back_page_id']){
                        $this->backPageId = $compareResult['back_page_id'];
                    }
                    $hasComparisonMatch = true;
                    break;
                }
            }
        }
        if (!empty($transferToPageId) && $hasComparisonMatch) {

            foreach ($compareResults as $compareResult) {
                if ($compareResult['comparison'] == SET_VALUE) {
                    $this->setValue($compareResult['key_value'], $apiResult[$compareResult['key_value']]);
                }
            }

            if( $this->backPageId ){
                //HelpersController::generateApiRequestResponseLog('BAck page id set value with multitask compare','',__FILE__,__LINE__);
                $this->setValue(BACK_NODE_KEY, $this->backPageId);
            }
            
        } else {
            return $this->getCompareErrorNode($compareResults);
        }

        $this->checkTinPinStatus();
        $this->previousPageId = $this->pageId;
        $this->pageId = $transferToPageId;
        $this->updateVivrJourneyLog();
    }

    private function checkTinPinStatus()
    {
        if ($this->moduleType == "TC" || $this->moduleType == "PC") {
            $this->tpStatus = 'Y';
        }
    }

    private function checkArithmeticOperation($apiKey)
    {
        if (strpos($apiKey, ADDITION) !== false) return ADDITION;
        else if (strpos($apiKey, SUBTRACTION) !== false) return SUBTRACTION;
        else if (strpos($apiKey, MULTIPLICATION) !== false) return MULTIPLICATION;
        else if (strpos($apiKey, DIVISION) !== false) return DIVISION;
        else return false;
    }

    private function setValueOperation($arithmeticOperation, $apiKey, $name)
    {
        if ($arithmeticOperation) {
            list($firstValue, $secondValue) = explode($arithmeticOperation, $apiKey);
            $firstValue = $this->cache->getCacheData($firstValue . $this->cacheKey);
            $secondValue = $this->cache->getCacheData($secondValue . $this->cacheKey);
            $value = HelpersController::arithmeticOperation($firstValue, $secondValue, $arithmeticOperation);
            return $this->setValue($name, $value);
        }
        $value = $this->cache->getCacheData($apiKey . $this->cacheKey);
        return $this->setValue($name, $value);
    }

    private function checkRequestLimit()
    {
        $lastRequestedPage = $this->cache->getCacheData(LAST_REQUESTED_PAGE . $this->cacheKey);
        if ($this->pageId == $lastRequestedPage) {
            $requestCount = $this->cache->getCacheData(REQUEST_COUNT . $this->cacheKey);
            if ($requestCount >= MAX_REQUEST_COUNT) {
                return true;
            }
            $requestCount++;
            $this->cache->updateCacheData(REQUEST_COUNT . $this->cacheKey, $requestCount);
            return false;
        }
        $this->cache->updateCacheData(LAST_REQUESTED_PAGE . $this->cacheKey, $this->pageId);
        $this->cache->updateCacheData(REQUEST_COUNT . $this->cacheKey, "1");
        return false;
    }

    private function checkInputErrorCount()
    {
        $pageData = $this->dataProvider->getPageData($this->pageId);
        if (is_array($pageData)) {
            $pageData = reset($pageData);
            if ($pageData['task'] == INPUT_ERROR_PAGE) {
                $errorPageId = $this->cache->getCacheData('errorPageId' . $this->cacheKey);
                if ($errorPageId == $this->pageId) {
                    
                    $errorCount = $this->cache->getCacheData('errorCount' . $this->cacheKey);
                    if ($errorCount >= MAX_REQUEST_COUNT) {
                        $this->pageId = DEFAULT_PAGE;
                        //HelpersController::generateApiRequestResponseLog([$errorPageId , $this->pageId,$errorCount], __METHOD__ ,__FILE__,__LINE__);
                        $this->cache->removeCacheData('errorPageId' . $this->cacheKey);
                        $this->cache->removeCacheData('errorCount' . $this->cacheKey);
                        $this->updateVivrJourneyLog();
                        return;
                    } else {
                        $errorCount++;
                        $this->cache->updateCacheData('errorCount' . $this->cacheKey, $errorCount);
                    }
                    //HelpersController::generateApiRequestResponseLog([$errorPageId , $this->pageId,$errorCount], __METHOD__ ,__FILE__,__LINE__);
                } else {
                    $this->cache->updateCacheData('errorPageId' . $this->cacheKey, $this->pageId);
                    $this->cache->updateCacheData('errorCount' . $this->cacheKey, 1);
                }
            }
        }
    }

    
}
