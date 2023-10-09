<?php

namespace App\Http\Controllers;

class ElementController
{
    public $elementId;
    public $pageId;
    public $elementType;
    public $displayTextEN;
    public $displayTextBN;
    public $backgroundColor;
    public $textColor;
    public $elementName;
    public $elementValue;
    public $elementOrder;
    public $rowCount;
    public $columnCount;
    public $isVisible;
    public $apiUrl;
    public $menuIcon;
    public $apiResponse;
    public $comparingData;
    public $comparingResult;
    public $keyList;
    public $calculations;
    public $calculationResult;
    public $dataProvider;
    public $cli;
    public $language;
    public $hasError;
    public $sessionId;
    public $cacheKey;
    public $custom1;
    public $buttonType;
    public $buttonName;


    public function __construct($elementData, $cli, $language, $cacheKey)
    {
        $this->elementId = $elementData['element_id'];
        $this->pageId = $elementData['page_id'];
        $this->elementType = $elementData['type'];
        $this->displayTextBN = $elementData['display_name_bn'];
        $this->displayTextEN = $elementData['display_name_en'];
        $this->backgroundColor = $elementData['background_color'];
        $this->textColor = $elementData['text_color'];
        $this->elementName = $elementData['name'];
        $this->elementValue = $elementData['value'];
        $this->elementOrder = $elementData['element_order'];
        $this->rowCount = $elementData['rows'];
        $this->columnCount = $elementData['columns'];
        $this->isVisible = $elementData['is_visible'];
        $this->apiUrl = $elementData['data_provider_function'];
        $this->menuIcon = json_decode($elementData['custom2']);
        $this->custom1 = $elementData['custom1'];
        $this->language = $language;
        $this->cli = $cli;
        $this->hasError = false;
        $this->cacheKey = $cacheKey;
        $this->sessionId = substr($cacheKey, 6);
    }

    


    protected function replaceBengaliDigits($text)
    {
        $bnDigits = array("০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯");

        foreach ($bnDigits as $key => $bnNumber) {
            $text = str_replace($key, $bnNumber, $text);
        }
        return $text;
    }

    protected function checkComparingData()
    {
        $this->comparingResult = false;
        foreach ($this->comparingData as $comparingData) {
            $compare = trim($comparingData['compare']);
            if (empty($compare)) {
                $this->comparingResult = true;
                return;
            }
            $compareText = str_replace(array('=', '!=', '==', '>', '<', '>=', '<='), '|', $compare);
            list($keyIndex, $keyValue) = explode('|', $compareText);
            $keyIndex = trim($keyIndex);
            $keyValue = trim($keyValue);
            if (empty($this->apiResponse[$keyIndex])) {
                $this->comparingResult = false;
                return;
            }
            $keyVariable = $this->apiResponse[$keyIndex];
            $this->comparingResult = $this->compareData($compare, $keyVariable, $keyValue);
            if ($this->comparingResult == false) return;
        }
    }

    private function compareData($compare, $keyVariable, $keyValue)
    {
        if (strpos($compare, '=') || strpos($compare, '==')) {
            return ($keyVariable == $keyValue);
        } elseif (strpos($compare, '>')) {
            return ($keyVariable > $keyValue);
        } elseif (strpos($compare, '<')) {
            return ($keyVariable < $keyValue);
        } elseif (strpos($compare, '>=')) {
            return ($keyVariable >= $keyValue);
        } elseif (strpos($compare, '<=')) {
            return ($keyVariable <= $keyValue);
        } elseif (strpos($compare, '!=')) {
            return ($keyVariable != $keyValue);
        }
        return false;
    }

    protected function unsetElementProperties()
    {
        unset($this->elementName);
        unset($this->pageId);
        unset($this->apiUrl);
        unset($this->apiResponse);
        unset($this->comparingData);
        unset($this->comparingResult);
        unset($this->keyList);
        unset($this->calculations);
        unset($this->calculationResult);
        unset($this->dataProvider);
        unset($this->cli);
        unset($this->language);
        unset($this->isVisible);
        unset($this->sessionId);
        unset($this->cacheKey);
        if ($this->elementType != ELEMENT_TYPE_TABLE) {
            unset($this->rowCount);
            unset($this->columnCount);
        }
        if ($this->elementType != ELEMENT_TYPE_BUTTON && $this->elementType != ELEMENT_TYPE_HYPERLINK) {
            unset($this->menuIcon);
        }
    }
}
