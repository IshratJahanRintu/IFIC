<?php

/** @var \Laravel\Lumen\Routing\Router $router */
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

//$router->post('/login/auth', 'AuthController@loginWithAuthCode');
//$router->post('/generate-auth-link','AuthController@generateAuthLink');

//$router->group(['middleware' => 'throttle'], function () use ($router) {
////    $router->post('/login/phone', 'AuthController@loginWithPhone');
////    $router->post('/login/pin', 'AuthController@loginWithPin');
//      $router->post('/login/auth', 'AuthController@loginWithAuthCode');
//      $router->post('/generate-auth-link','AuthController@generateAuthLink');
//});

$router->group([], function () use ($router) {
    $router->group([], function () use ($router) {
//    $router->post('/login/phone', 'AuthController@loginWithPhone');
//    $router->post('/login/pin', 'AuthController@loginWithPin');
        $router->post('/login/auth', 'AuthController@loginWithAuthCode');
        $router->post('/generate-auth-link', [
            'middleware' => [],
            'uses' => 'AuthController@generateAuthLink'
        ]);
    });

    $router->group(['middleware' => 'auth'], function () use ($router) {
        $router->post('/vivr-data', 'PageDataController@getPageData');
        $router->post('/logout', 'AuthController@logout');
    });
    $router->post('/ice', 'IceFeedbackController@storeIceFeedback');

});

