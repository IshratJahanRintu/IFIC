<?php

namespace App\Http\Controllers;

class ButtonElementController extends ElementController
{
    public $buttonItems;

    public function __construct($elementData, $cli, $language, $cacheKey)
    {
        parent::__construct($elementData, $cli, $language, $cacheKey);
        $this->setButtonPropertyProperties();
        $this->unsetElementProperties();
    }

    function getButtonDataFromApiResponse ( $apiResponse , $keyData  )
    {
        $finalData = array();
        foreach ($keyData as $i => $key) {
            if ( $key == '*' ) {
                $finalData = $this->getButtonDataFromApiResponse ( $apiResponse , array_slice ( $keyData , $i + 1 ));
                  break;
            } else if ( isset( $apiResponse[ $key ] ) ) {
                $apiResponse = $apiResponse[ $key ];
            } else {
                foreach ($apiResponse as $data) {
                    $finalData[] = $data[ $key ];
                }
            }
        }
        return $finalData;
    }

    private function  ccproButtonLevelAndValueKeyFormat($keyString)
    {
        $keyList = explode ( ' ',$keyString);
        $apiResponse = $this->apiResponse;
        $buttonData = [];
        foreach ($keyList as $keyData) {
            $keyData = explode ( '->' , $keyData );
            if( !next( $keyList ) )
                $option['value'] = $this->getButtonDataFromApiResponse ( $apiResponse , $keyData );
            else
                $option[] = $this->getButtonDataFromApiResponse ( $apiResponse , $keyData );

        }
        return $option;
        
    }

    public function setButtonPropertyProperties()
    {
        // $properties = json_decode($this->elementName, true);
        $this->buttonItems = array();
        $this->buttonType = 'single';
        if (!empty($this->apiUrl)) {
            
            $this->dataProvider = new DataProviderController();
            $this->apiResponse = $this->dataProvider->getApiResult($this->cli, $this->sessionId, $this->apiUrl);
            if (is_array($this->apiResponse) && count($this->apiResponse)) {
                $this->buttonType = 'multiple';
                $this->buttonName = $this->elementName;
                $this->apiResponse = reset ( $this->apiResponse);
                if($this->custom1 == 'card' && isset($this->apiResponse['responseData'])){
                    // need operation for format data card information
                    $this->buttonItems = $this->apiResponse['responseData'];                    ;
                }else{
                    $this->keyList = $this->dataProvider->getApiKeyData($this->elementId);
                    $this->keyList = array_values($this->keyList);
                    $this->keyList = $this->keyList[0]['response_key'];
                    $buttonInfo = $this->ccproButtonLevelAndValueKeyFormat($this->keyList);
                    $buttonValue = $buttonInfo['value'];
                    array_pop($buttonInfo);
                    foreach($buttonValue as $k=>$item){
                        $this->buttonItems[] = array(
                            'buttonTitleEN' => $buttonInfo[0][$k],
                            'buttonTitleBN' => $buttonInfo[1][$k],
                            'buttonValue' => $item
                        );
                    }
                }
                
            }
            
            
        }
    }

}
