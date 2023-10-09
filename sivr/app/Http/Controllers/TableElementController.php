<?php

namespace App\Http\Controllers;

class TableElementController extends ElementController
{
    public $tableHead;
    public $tableData;
    public $tableType;

    public function __construct($elementData, $cli, $language, $cacheKey)
    {
        parent::__construct($elementData, $cli, $language, $cacheKey);
        $this->dataProvider = new DataProviderController();
        $this->tableHead = array();
        $this->tableData = array();
        $this->formTableData();
        $this->unsetTableProperties();
        $this->unsetTableProperties();
    }

    private function unsetTableProperties()
    {
        $this->unsetElementProperties();
        unset($this->elementValue);
    }

    private function getTableType()
    {
        if (!empty($this->elementValue) && isJson($this->elementValue)) {
            $this->elementValue = json_decode($this->elementValue, true);
            if (is_array($this->elementValue)) {
                return array_keys($this->elementValue)[0];
            }
        }
        return null;
    }

    private function formTableData()
    {
        $tableType = $this->getTableType();
        if ($tableType == STATIC_TABLE_KEY) {
            $this->tableType=STATIC_HORIZONTAL_TYPE;
            $this->formStaticTable();
        } elseif ($tableType == DYNAMIC_TABLE_KEY) {
            $this->tableType=DYNAMIC_HORIZONTAL_TYPE;
            $this->formDynamicTable();
        } elseif ($tableType == DYNAMIC_TABLE_VERTICAL) {
            $this->tableType=DYNAMIC_VERTICAL_TYPE;
            $this->formDynamicVerticalTable();
        } else {
            $this->hasError = true;
        }
    }

    private function formStaticTable()
    {
        $this->tableHead[BENGALI] = $this->elementValue[STATIC_TABLE_KEY][TABLE_HEADING][BENGALI_TABLE_HEADING];
        $this->tableHead[ENGLISH] = $this->elementValue[STATIC_TABLE_KEY][TABLE_HEADING][ENGLISH_TABLE_HEADING];

        foreach ($this->elementValue[STATIC_TABLE_KEY][BENGALI_TABLE_ROW] as $item) {
            $this->tableData[BENGALI][] = $item['data'];
        }
        foreach ($this->elementValue[STATIC_TABLE_KEY][ENGLISH_TABLE_ROW] as $item) {
            $this->tableData[ENGLISH][] = $item['data'];
        }
    }

    private function formDynamicTable()
    {
        foreach ($this->elementValue[DYNAMIC_TABLE_KEY] as $dynamicTableData) {
            $this->tableHead[BENGALI][] = $dynamicTableData[BENGALI_TABLE_HEADING];
            $this->tableHead[ENGLISH][] = $dynamicTableData[ENGLISH_TABLE_HEADING];
        }
        $this->tableData[BENGALI] = $this->tableData[ENGLISH] = $this->getDynamicTableData();
    }

    private function formDynamicVerticalTable()
    {
        foreach ($this->elementValue[DYNAMIC_TABLE_VERTICAL] as $dynamicTableData) {
            $this->tableHead[BENGALI][] = $dynamicTableData[BENGALI_TABLE_HEADING];
            $this->tableHead[ENGLISH][] = $dynamicTableData[ENGLISH_TABLE_HEADING];
        }
        $this->tableData[BENGALI] = $this->tableData[ENGLISH] = $this->getDynamicVerticalTableData();
    }


    private function getDynamicTableData()
    {
        if (!empty($this->apiUrl)) {
            $this->apiResponse = $this->dataProvider->getApiResult($this->cli, $this->sessionId, $this->apiUrl, null, $this->cacheKey);
            if (is_array($this->apiResponse)) {
                $this->setApiResponseForTable();
                return $this->getTableDataFromApiResponse(DYNAMIC_HORIZONTAL_TYPE);
            } else {
                $this->hasError = true;
                return ;
            }
        }
    }

    private function getDynamicVerticalTableData()
    {
        if (!empty($this->apiUrl)) {
            $this->apiResponse = $this->dataProvider->getApiResult($this->cli, $this->sessionId, $this->apiUrl, null, $this->cacheKey);
            if (is_array($this->apiResponse)) {
                $this->setApiResponseForTable();
                return $this->getTableDataFromApiResponse(DYNAMIC_VERTICAL_TYPE);
            } else {
                $this->hasError = true;
                return;
            }
        }
    }

    private function setApiResponseForTable()
    {
        if (array_key_exists(TABLE_DATA_KEY, $this->apiResponse[0])) {
            if (is_array($this->apiResponse[0][TABLE_DATA_KEY])) {
                $this->apiResponse = $this->apiResponse[0][TABLE_DATA_KEY];
            }
        }
    }

    private function getTableDataFromApiResponse($key)
    {
        $this->calculations = $this->dataProvider->getElementsCalculations($this->elementId);
        $tableData = array();
        foreach ($this->apiResponse as $apiResponse) {

            if($key == 'DVT'){
                $tableData[] = $this->getVerticalTableData($apiResponse);
            }else{
                $tableData[] = $this->getTableData($apiResponse);
            }

        }
        return $tableData;
    }

    private function getTableData($apiResponse)
    {
        $tableData = array();
        foreach ($this->elementValue[DYNAMIC_TABLE_KEY] as $key) {
            $data = null;
            if (strpos($key['key_id'], ".") !== false) {
                $data = $this->getDataFromMultilevelArray($key, $apiResponse);
            } else {
                if (array_key_exists($key['key_id'], $apiResponse)) {
                    $data = $apiResponse[$key['key_id']];
                }
            }
            if (!empty($data)) {
                $data = $this->getCalculatedData($key, $data);
            }
            $tableData[] = $data;
        }
        return $tableData;
    }

    private function getVerticalTableData ( $apiResponse )
    {
        $tableData = array();
        foreach ($this -> elementValue[ DYNAMIC_TABLE_VERTICAL ] as $key) {
            $data = null;
            if ( strpos ( $key[ 'key_id' ] , '.' ) !== false ) {
                $data = $this -> getDataFromMultilevelArray ( $key , $apiResponse );
            }
            else {
                if ( array_key_exists ( $key[ 'key_id' ] , $apiResponse ) ) {
                    $data = $apiResponse[ $key[ 'key_id' ] ];
                }
            }
            if ( ! empty( $data ) ) {
                $data = $this -> getCalculatedData ( $key , $data );
            }
            $tableData[] = $data;
        }
        return $tableData;
    }

    private function getDataFromMultilevelArray($key, $apiResponse)
    {
        $data = $apiResponse;
        $keyIndexList = explode(".", $key['key_id']);
        foreach ($keyIndexList as $keyIndex) {
            if (!array_key_exists($keyIndex, $data)) {
                return null;
            }
            $data = $data[$keyIndex];
        }
        return $data;
    }

    private function getCalculatedData($key, $data)
    {
        if (!is_array($this->calculations)) return $data;
        foreach ($this->calculations as $calculation) {
            if (strpos($calculation['calculation'], $key['key_id']) !== false && $data != "") {
                $calculationData = str_replace("<" . $key['key_id'] . ">", '"' . $data . '"', $calculation['calculation']);
                $data = eval("return ($calculationData);");
                break;
            }
        }
        return $data;
    }

    private function getReplacedData($key, $data)
    {
        //replace after data calculation
        if ($key->replace != null) {
            $hasReplace = false;
            foreach ($key->replace as $replaceInfo) {
                if ($replaceInfo->replace_data == $data) {
                    $data = $replaceInfo->replace_value;
                    $hasReplace = true;
                }
            }
            if ($hasReplace == false) {
                $data = $key->replace_default;
            }
        }
        return $data;
    }


}
