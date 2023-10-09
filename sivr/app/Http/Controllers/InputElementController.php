<?php

namespace App\Http\Controllers;

class InputElementController extends ElementController
{
    public $inputProperties;

    public function __construct ( $elementData , $cli , $language , $cacheKey )
    {
        parent::__construct ( $elementData , $cli , $language , $cacheKey );
        $this->setInputProperties ();
        $this->unsetElementProperties ();
    }

    function getDropdownDataFromApiResponse ( $apiResponse , $keyData  )
    {
        $finalData = array();
        foreach ($keyData as $i => $key) {
            if ( $key == '*' ) {
                $finalData = $this->getDropdownDataFromApiResponse ( $apiResponse , array_slice ( $keyData , $i + 1 ));
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


    private function  ccproOptionLevelAndValueKeyFormat($levelString,$valueString)
    {

        $keyList = explode ( ';' , $levelString.';'.$valueString );
        $apiResponse = $this->apiResponse;

        $option = [];
        foreach ($keyList as $keyData) {
            $keyData = explode ( '->' , $keyData );
            if( !next( $keyList ) )
                $option['value'] = $this->getDropdownDataFromApiResponse ( $apiResponse , $keyData );
            else
                $option[] = $this->getDropdownDataFromApiResponse ( $apiResponse , $keyData );

        }
        return $option;
    }

    private function setInputProperties ()
    {
        $properties  = json_decode ( $this->elementName , true );
        $this->inputProperties = array();

        $this->inputProperties[ 'name' ] = $properties[ 'name' ];
        $this->inputProperties[ 'type' ] = $properties[ 'input_type' ];
        if ( $properties[ 'input_type' ] == DROPDOWN_TYPE_INPUT ) {
            $this->inputProperties[ 'optionData' ] = array();
            if ( ! empty( $this->apiUrl ) ) { // for dynamic dropdown
                $this->dataProvider = new DataProviderController();
                $this->apiResponse = $this->dataProvider->getApiResult($this->cli, $this->sessionId, $this->apiUrl,[],$this->cacheKey);


                if ( is_array ( $this->apiResponse ) ) {

                    $this->apiResponse = reset ( $this->apiResponse);
                    $labelStringEN = $properties[ 'select_option_row' ][ENGLISH][0];
                    $labelStringBN = $properties[ 'select_option_row' ][BENGALI][0];
                    $valueString = $properties[ 'select_value_row' ][0];
                    
                    $optionDataEn = $this->ccproOptionLevelAndValueKeyFormat ( $labelStringEN , $valueString);
                    $optionDataBn = $this->ccproOptionLevelAndValueKeyFormat ( $labelStringBN , $valueString);
                    //get value bangle and english and unshift value from optionDataEn optionDataBn
                    $dropDownValue = $optionDataEn['value'];
                    array_pop($optionDataEn);
                    array_pop($optionDataBn);

                    $levelEn = [];
                    $levelBn = [];

                    foreach ($optionDataEn as $itemInfo){
                        foreach ($itemInfo as $key=>$item) {
                            if(isset($levelEn[$key])){
                                $levelEn[$key]  =  $levelEn[$key] . ' ' . $item;
                            }else{
                                $levelEn[$key]  =   $item;
                            }
                        }
                    }

                    foreach ($optionDataBn as $list) {
                        foreach ($list as $key=>$item) {
                            if(isset($levelBn[$key])){
                                $levelBn[$key]  =  $levelBn[$key] . ' ' . $item;
                            }else{
                                $levelBn[$key]  =   $item;
                            }
                        }
                    }

                    for ($counter = 0; $counter < count ($levelEn) ; $counter ++) {
                        $this->inputProperties[ 'optionData' ][] = array(
                            'optionEN' => $levelEn[ $counter ] ,
                            'optionBN' => $levelBn[ $counter ] ,
                            'optionValue' => $dropDownValue[ $counter ]
                        );
                    }

                }
            } else { //for static dropdown

                for ($counter = 0; $counter < $this->rowCount; $counter ++) {
                    $this->inputProperties[ 'optionData' ][] = array(
                        'optionEN' => $properties[ 'select_option_row' ][ ENGLISH ][ $counter ] ,
                        'optionBN' => $properties[ 'select_option_row' ][ BENGALI ][ $counter ] ,
                        'optionValue' => $properties[ 'select_value_row' ][ $counter ]
                    );
                }
            }

        }
        $this->inputProperties[ 'maxTry' ]      = ! empty( $properties[ 'max_try' ] ) ? $properties[ 'max_try' ] : "";
        $this->inputProperties[ 'maxValue' ]    = ! empty( $properties[ 'max_value' ] ) ? $properties[ 'max_value' ] : '';
        $this->inputProperties[ 'minValue' ]    = ! empty( $properties[ 'min_value' ] ) ? $properties[ 'min_value' ] : '';
        $this->inputProperties[ 'placeholder' ] = ! empty( $properties[ 'placeholder' ] ) ? $properties[ 'placeholder' ] : "";
        $this->inputProperties[ 'isRequired' ]  = ! empty( $properties[ 'required' ] ) ? $properties[ 'required' ] : "N";;
        $this->elementType                      = 'dynamicInput';
    }

}
