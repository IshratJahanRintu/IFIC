<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log ;

class CacheController
{


    public static function getCacheData($key)
    {

        return Cache::get($key);
    }

    public function setCacheData($key, $value, $duration = LOGIN_DURATION)
    {

        try {
            Cache::put($key, $value, $duration);
//            Log::warning('log this error');
        }
        catch(\Exception $e){
            dump($e->getMessage());
            exit;
        }

    }

    public function updateCacheData($key, $value, $duration = LOGIN_DURATION)
    {
        if ($this->hasCacheValue($key)) {
            $this->removeCacheData($key);
        }
        $this->setCacheData($key, $value, $duration);
    }

    public static function removeCacheData($key)
    {
        Cache::forget($key);
    }

    public function hasCacheValue($key)
    {
        return Cache::has($key);
    }
}
