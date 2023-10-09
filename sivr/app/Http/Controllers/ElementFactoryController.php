<?php

namespace App\Http\Controllers;

class ElementFactoryController
{
    private $elementData;
    private $language;
    private $cli;
    private $cacheKey;

    public function __construct($elementData, $cli, $language, $cacheKey)
    {
        $this->elementData = $elementData;
        $this->cli = $cli;
        $this->language = $language;
        $this->cacheKey = $cacheKey;
    }

    public function getElement()
    {
        $element = null;
        if ($this->elementData['type'] == ELEMENT_TYPE_PARAGRAPH) {
            $element = new ParagraphElementController($this->elementData, $this->cli, $this->language, $this->cacheKey);
        } elseif ($this->elementData['type'] == ELEMENT_TYPE_BUTTON) {
            $element = new ButtonElementController($this->elementData, $this->cli, $this->language, $this->cacheKey);
        } elseif ($this->elementData['type'] == ELEMENT_TYPE_TABLE) {
            $element = new TableElementController($this->elementData, $this->cli, $this->language, $this->cacheKey);
        } elseif ($this->elementData['type'] == ELEMENT_TYPE_HYPERLINK) {
            $element = new HyperlinkElementController($this->elementData, $this->cli, $this->language, $this->cacheKey);
        } elseif ($this->elementData['type'] == ELEMENT_TYPE_INPUT) {
            $element = new InputElementController($this->elementData, $this->cli, $this->language, $this->cacheKey);
        }

        if($element->hasError){
            $element = new ErrorElementController($this->language);
            $element = $element->getApiErrorMsg();
        }
        return $element;
    }

    
}
