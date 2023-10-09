<?php

namespace App\Http\Controllers;

class ParagraphElementController extends ElementController
{
    public $dynamicAudioFiles;

    public function __construct($elementData, $cli, $language, $cacheKey)
    {
        parent::__construct($elementData, $cli, $language, $cacheKey);
        $this->dataProvider = new DataProviderController();
        $this->formElementData();
        $this->unsetElementProperties();
    }

    private function formElementData()
    {
        if (!empty($this->apiUrl)) {
            $this->apiResponse = $this->dataProvider->getApiResult($this->cli, $this->sessionId, $this->apiUrl, null, $this->cacheKey);
            if (is_array($this->apiResponse)) {
                $this->apiResponse = reset($this->apiResponse);
                if (strpos($this->displayTextBN, DYNAMIC_TEXT) !== false || strpos($this->displayTextEN, DYNAMIC_TEXT) !== false) {
                    $this->replaceDynamicData();
                } else {
                    $this->getCalculatedData();
                }
            } else {
                $this->hasError = true;
                return;
            }
        }
        if (!is_array($this->dynamicAudioFiles)) {
            unset($this->dynamicAudioFiles);
        }
        if ($this->hasDynamicText()) {
            $this->replaceDynamicDataFromCache();
        }
    }

    private function hasDynamicText()
    {
        return (strpos($this->displayTextBN, DYNAMIC_TEXT) !== false || strpos($this->displayTextEN, DYNAMIC_TEXT) !== false);
    }

    private function replaceDynamicData()
    {
        $this->getDynamicValue();
        $this->getDynamicAudio("$");
        if (is_float($this->calculationResult)) $this->calculationResult = round($this->calculationResult, 2);
        $this->displayTextEN = str_replace(DYNAMIC_TEXT, $this->calculationResult, $this->displayTextEN);
        $this->displayTextBN = str_replace(DYNAMIC_TEXT, $this->calculationResult, $this->displayTextBN);
        $this->displayTextBN = $this->replaceBengaliDigits($this->displayTextBN);
    }

    private function getDynamicValue()
    {
        $this->comparingData = $this->dataProvider->getComparingData($this->elementId);
        if (is_array($this->comparingData)) {
            $this->checkComparingData();
            if (!$this->comparingResult) {
                $this->hasError = true;
                return;
            }
        }
        $this->getCalculatedData();
        if ($this->calculationResult === null) {
            $this->hasError = true;
        }
    }

    private function getCalculatedData()
    {
        $this->calculations = $this->dataProvider->getElementsCalculations($this->elementId);
        $this->keyList = $this->dataProvider->getApiKeyData($this->elementId);
        $this->calculationResult = null;
        foreach ($this->keyList as $keyData) {
            foreach ($this->calculations as $calculation) {
                $calculation = trim($calculation['calculation']);
                if (strpos($calculation, "<RV>") !== false) {
                    $calculation = str_replace("<RV>", $this->apiResponse[$keyData["response_key"]], $calculation);
                } else {
                    if(!empty($calculation)){
                        $calculation = str_replace("<" . $keyData['response_key'] . ">", $this->apiResponse[$keyData["response_key"]], $calculation);
                    }
                }
                if (!empty($calculation || $calculation === "0")) {
                    $this->calculationResult = eval("return ($calculation);");
                }
            }
        }
    }

    private function getDynamicAudio($param = '')
    {
        $this->dynamicAudioFiles = read_value($this->calculationResult, $param);
        $this->dynamicAudioFiles = explode(",", $this->dynamicAudioFiles);
    }

    private function replaceDynamicDataFromCache()
    {
        $dynamicValue = CacheController::getCacheData($this->elementName . $this->cacheKey);
        $this->displayTextEN = str_replace(DYNAMIC_TEXT, $dynamicValue, $this->displayTextEN);
        $this->displayTextBN = str_replace(DYNAMIC_TEXT, $dynamicValue, $this->displayTextBN);
        $this->displayTextBN = $this->replaceBengaliDigits($this->displayTextBN);
        //read values
        $this->calculations = $this->dataProvider->getElementsCalculations($this->elementId);
        foreach ($this->calculations as $calculation) {
            $calculation = trim($calculation['calculation']);
            $this->calculationResult = $dynamicValue;
            if (strpos($calculation, "<RV>") !== false) {
                $this->getDynamicAudio('$');
            } else if (strpos($calculation, "<RVN>") !== false) {
                $this->getDynamicAudio();
            }
        }
    }

}
