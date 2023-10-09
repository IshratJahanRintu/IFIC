<?php
include_once ('BmtbCrmResponse.php');
$_REQUEST['DCARD'] = !empty($_REQUEST['SCARD']) && ctype_digit($_REQUEST['SCARD']) ? $_REQUEST['SCARD'] : $_REQUEST['DCARD']; //search only
$maskedPan = !empty($_REQUEST['DCARD']) && ctype_digit($_REQUEST['DCARD']) ? substr($_REQUEST['DCARD'], 0, 6) . '%' . substr($_REQUEST['DCARD'], -4) : '';
$mobileNumber = !empty($_REQUEST['CLI']) ? substr($_REQUEST['CLI'], -11) : '';
$type = !empty($_REQUEST['type']) ? strtoupper($_REQUEST['type']) : '';
$card_no_length = !empty($_REQUEST['DCARD']) && ctype_digit($_REQUEST['DCARD']) ? strlen($_REQUEST['DCARD']) : 0;
$maskedPan = !empty($_REQUEST['SCLI']) && ctype_digit($_REQUEST['SCLI']) ? '' : $maskedPan; // search only
$result = '';
$bmtbResponse = new BmtbCrmResponse;
$response = [['gmsg' => 'ok', 'gstatus' => true, 'gcode' => 200, 'gmcode' => 3069, 'gmmsg' => 'Valid', 'gdata' => []]];

switch ($type)
{
    case 'MWCSINAC':
        //1Customer Details by Account number: MWCSINAC
        $result = getCustomerDetails();
        break;
    case 'MWCSINME':
        $response = [array_merge($response[0], $bmtbResponse->customerInfoByMobileEmail) ];
        //2 Customer Info By MobileEmail: MWCSINME
        $result = json_encode($response);
        break;
    case 'MWLSFVWD':
        $response = [array_merge($response[0], $bmtbResponse->AcFiveWithDrawTran) ];
        // 4 Account Five withdrawal transactional: MWLSFVWD
        $result = json_encode($response);
        break;

    case 'MWCSINAC':
        $response = [array_merge($response[0], $bmtbResponse->AcBalByAcNo) ];
        // 3Account Balance by Account number: MWCSINAC
        $result = json_encode($response);
        break;
    case 'MWLSFVDP':
        $response = [array_merge($response[0], $bmtbResponse->AcFiveDepositTran) ];
        $result = json_encode($response);
        //5 Account Five deposit transactional: MWLSFVDP
        break;
    case 'MWCREFDR':
        // 6 FDR Creation : MWCREFDR 
        $response = [array_merge($response[0], $bmtbResponse->FdrCreation) ];
        $result = json_encode($response);
        break;

    case 'MWCREDPS':
        $response = [array_merge($response[0], $bmtbResponse->PSSDPSCreation) ];
        $result = json_encode($response);
        //7 PSS-DPS Creation : MWCREDPS
        break;
    case 'MWFTATAC':
        $response = [array_merge($response[0], $bmtbResponse->NewFundTraAccToAcc) ];
        $result = json_encode($response);
        // 8 New Fund Transfer Acc to Acc: MWFTATAC
        break;
    case 'MWFTATAR':
        $response = [array_merge($response[0], $bmtbResponse->ReverseFundTransfer) ];
        $result = json_encode($response);
        // 8.1 Reverse Fund Transfer Acc to Acc: MWFTATAR
        break;
    
    case 'MWSENSMS':
        $response = [array_merge($response[0], $bmtbResponse->SivrSMSLink) ];
        $result = json_encode($response);
        //9 SIVR SMS Link API: MWSENSMS
        break;
    
    case 'MWSENSMS':
        $result = sendSMS();
        // 10 SEND SMS: MWSENSMS
        break;

    case 'MWCSINCI':
        $response = [array_merge($response[0], $bmtbResponse->CustomerDetByCusId) ];
        $result = json_encode($response);
        // 11 Customer Details by Customer Id: MWCSINCI
        break;
    case 'MWCBACBR':
        $response = [array_merge($response[0], $bmtbResponse->CustomerDetByCusId) ];
        $result = json_encode($response);
        //12 Check Book Cbr: MWCBACBR
        break;
    case 'CCODACD':
        $result = CCODAccountDetails();
        //serAllDPLAcInfoRes
        break;
    case 'LOANDET':
        $result = LoanDetailsApi();
        //serAllDPLAcInfoRes
        break;
    case 'CREDITCS':
        $result = CreditCardDetails();
        //cardAccountDetails
        break;
    case 'CLALACLC':
        $result = CardMoreInfoDetails();
        //cardAccountDetails
        break;
    case 'CREDITCD':
        $result = CreditCardStatementDetails();
        //cardAccountDetails
        break;
    case 'SGDSB':
        $result = CardStatementDetailsInfo();
        //cardAccountDetails
        break;
    case 'TPINVCHAPI':
        $result = tpinValidationCheckApi();
        //cardAccountDetails
        break;
}

echo $result;
exit();

function accountDetailsAPi()
{
    global $bmtbResponse, $response;
    $response = [array_merge($response[0], $bmtbResponse->customerACInfo) ];
    return json_encode($response);
}

/**
 *
 *
 * @return false|string|\Stringable
 * @todo Need to apply main logic after get api response from mtb
 * @author Iftakhar Alam Rizve
 */
function CCODAccountDetails()
{
    global $bmtbResponse, $response;
    $response = [array_merge($response[0], $bmtbResponse->serAllDPLAcInfoRes) ];
    return json_encode($response);
}


/**
 *
 *
 * @return false|string|\Stringable
 * @todo Need to apply main logic after get api response from mtb
 * @author Iftakhar Alam Rizve
 */
function LoanDetailsApi()
{
    global $bmtbResponse, $response;
    $response = [array_merge($response[0], $bmtbResponse->serAllDPLAcInfoRes) ];
    return json_encode($response);
}


/**
 *
 *
 * @return false|string|\Stringable
 * @todo Need to apply main logic after get api response from mtb
 * @author Iftakhar Alam Rizve
 */
function CreditCardDetails()
{
    global $bmtbResponse, $response;
    $response = [array_merge($response[0], $bmtbResponse->cardAccountDetails) ];
    return json_encode($response);
}


/**
 *
 *
 * @return false|string|\Stringable
 * @todo Need to apply main logic after get api response from mtb
 * @author Iftakhar Alam Rizve
 */
function CardMoreInfoDetails()
{
    global $bmtbResponse, $response;
    $response = [array_merge($response[0], $bmtbResponse->cardAccountDetails) ];
    return json_encode($response);
}


/**
 *
 *
 * @return false|string|\Stringable
 * @todo Need to apply main logic after get api response from mtb
 * @author Iftakhar Alam Rizve
 */
function CreditCardStatementDetails()
{
    global $bmtbResponse, $response;
    $response = [array_merge($response[0], $bmtbResponse->cardAccountDetails) ];
    return json_encode($response);
}


/**
 * This function use for get card Account  Details from external file
 *
 * @return false|string|\Stringable
 * @todo Need to apply main logic after get api response from mtb
 * @author Iftakhar Alam Rizve
 */
function CardStatementDetailsInfo()
{
    global $bmtbResponse, $response;
    $response = [array_merge($response[0], $bmtbResponse->cardAccountDetails) ];
    return json_encode($response);
}


/**
 * This function use for get customer Details from external file
 *
 * @return false|string|\Stringable
 * @todo Need to apply main logic after get api response from mtb
 * @author Iftakhar Alam Rizve
 */
function getCustomerDetails()
{
    global $bmtbResponse, $response;
    $response = [array_merge($response[0], $bmtbResponse->customerInfo) ];
    return json_encode($response);
}

/**
 * This function use for get Account Details from external file
 *
 * @return false|string|\Stringable
 * @todo Need to apply main logic after get api response from mtb
 * @author Iftakhar Alam Rizve
 */
function sendSms()
{
    global $bmtbResponse, $response;
    $response = [array_merge($response[0], $bmtbResponse->sendSms) ];
    return json_encode($response);
}

/**
 * This function use for get Card Details By Phone Number from external file
 *  resposne[0] use because our external api response always nested array
 * @param int
 * @return false|string|\Stringable
 * @todo Need to apply main logic after get api response from mtb
 * @todo Need apply argument process , when confirm api
 * @author Iftakhar Alam Rizve
 */
function cardDetailsByMobileNumber()
{
    global $bmtbResponse, $response;
    $response = [array_merge($response[0], $bmtbResponse->cardAccountDetails) ];
    return json_encode($response);
}


/**
 * This function use for validate token from external file
 * resposne[0] use because our external api response always nested array
 * @return false|string|\Stringable
 * @todo Need to apply main logic after get api response from mtb
 * @todo Need apply argument process , when confirm api
 * @author Iftakhar Alam Rizve
 */
function tpinValidationAPI()
{

    global $bmtbResponse, $response;
    $response = [array_merge($response[0], $bmtbResponse->customerACInfo) ];
    return json_encode($response);
}

/**
 * This function use for  Pin Change  or Reset Pin from external file
 * resposne[0] use because our external api response always nested array
 * @return false|string|\Stringable
 * @todo Need to apply main logic after get api response from mtb
 * @todo Need apply  pin change business logic  when confirm api
 * @author Iftakhar Alam Rizve
 */
function pinChangeOrReset()
{
    global $bmtbResponse, $response;
    $response = [array_merge($response[0], $bmtbResponse->customerACInfo) ];
    return json_encode($response);
}

/**
 * this function use for check Cart status information from external file
 * resposne[0] use because our external api response always nested array
 * @return false|string|\Stringable
 * @todo Need to apply main logic after get api response from mtb
 * @todo Need apply  card status business logic  when confirm api
 * @author Iftakhar Alam Rizve
 */
function checkCardStatus()
{
    global $bmtbResponse, $response;
    $response = [array_merge($response[0], $bmtbResponse->cardAccountDetails) ];
    return json_encode($response);
}

/**
 * This function use for process account transaction
 * resposne[0] use because our external api response always nested array
 * @return false|string|\Stringable
 * @todo Need to apply main logic after get api response from mtb
 * @todo Need apply  Account Transaction APi business logic  when confirm api
 * @author Iftakhar Alam Rizve
 */
function accountTransactionAPi()
{
    global $bmtbResponse, $response;
    $response = [array_merge($response[0], $bmtbResponse->onlineAcccountStatement) ];
    return json_encode($response);
}

/**
 * get last five transaction list from external api
 * resposne[0] use because our external api response always nested array
 * @return false|string|\Stringable
 * @todo Need to apply main logic after get api response from mtb
 * @todo Need apply Last Five Transaction business logic  when confirm api
 * @author Iftakhar Alam Rizve
 */
function lastFiveTransaction()
{
    global $bmtbResponse, $response;
    $response = [array_merge($response[0], $bmtbResponse->onlineAcccountStatement) ];
    return json_encode($response);
}

/**
 * get last five Withdrawal api list from external api
 * resposne[0] use because our external api response always nested array
 * @return false|string|\Stringable
 * @todo Need to apply main logic after get api response from mtb
 * @todo Need apply Last Five Deposit Api business logic  when confirm api
 * @author Iftakhar Alam Rizve
 */
function lastFiveWithDrawalAPI()
{
    global $bmtbResponse, $response;
    $response = [array_merge($response[0], $bmtbResponse->onlineAcccountStatement) ];
    return json_encode($response);
}

/**
 * get last five DPosit list from external api
 * resposne[0] use because our external api response always nested array
 * @return false|string|\Stringable
 * @todo Need to apply main logic after get api response from mtb
 * @todo Need apply Last Five Deposit Api business logic  when confirm api
 * @author Iftakhar Alam Rizve
 */
function lastFiveDepositAPI()
{
    global $bmtbResponse, $response;
    $response = [array_merge($response[0], $bmtbResponse->onlineAcccountStatement) ];
    return json_encode($response);
}


/**
 * Get Single DPS details from extranal api
 * resposne[0] use because our external api response always nested array
 * @return false|string|\Stringable
 * @todo Need to apply main logic after get api response from mtb
 * @todo Need apply DPS Details  Api business logic  when confirm api
 * @author Iftakhar Alam Rizve
 */
function DpsDetailsAPI()
{
    global $bmtbResponse, $response;
    $response = [array_merge($response[0], $bmtbResponse->serAllDPLAcInfoRes) ];
    return json_encode($response);
}

/**
 * Get Single FDR details from extranal api
 * resposne[0] use because our external api response always nested array
 * @return false|string|\Stringable
 * @todo Need to apply main logic after get api response from mtb
 * @todo Need apply FDR Details  Api business logic  when confirm api
 * @author Iftakhar Alam Rizve
 */
function FdrDetailsAPI()
{
    global $bmtbResponse, $response;
    $response = [array_merge($response[0], $bmtbResponse->fdrProductInfo) ];
    return json_encode($response);
}

function tpinValidationCheckApi()
{
    global $bmtbResponse, $response;
    $response = [array_merge($response[0], $bmtbResponse->VerifyTpin) ];
    return json_encode($response);
}
