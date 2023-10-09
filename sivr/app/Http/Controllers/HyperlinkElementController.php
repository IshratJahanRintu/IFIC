<?php

namespace App\Http\Controllers;

class HyperlinkElementController extends ElementController
{
    public function __construct($elementData, $cli, $language, $cacheKey)
    {
        parent::__construct($elementData, $cli, $language, $cacheKey);
        $this->dataProvider = new DataProviderController();
        $this->hyperLinkProperties();
        $this->unsetElementProperties();
    }

    private function hyperLinkProperties()
    {
        $this->elementValue = json_decode($this->elementValue, true);
        $url = new \stdClass();
        $url->{ENGLISH} = $this->elementValue[ENGLISH_WEB_KEY];
        $url->{BENGALI} = $this->elementValue[BENGALI_WEB_KEY];
        $this->elementValue = $url;
        
        switch($this->custom1){
            case 'paragrap_link':
                break;
            case 'video_link':
                break;
            case 'button_link':
                break;
            case 'download_link':
                break;
            case 'blog_link':
                $this->apiResponse = $this->dataProvider->getBlogPageData($url->{ENGLISH});
                if (is_array($this->apiResponse)) {
                    $this->apiResponse = reset($this->apiResponse);
                    $url->title[ENGLISH] = $this->apiResponse['en_title'];
                    $url->title[BENGALI] = $this->apiResponse['bn_title'];
                    $url->content[ENGLISH] = base64_decode($this->apiResponse['en_description']);
                    $url->content[BENGALI] = base64_decode($this->apiResponse['bn_description']);
                } else {
                    $this->hasError = true;
                    return;
                }
                break;
            default:
                
        }
    }
}
