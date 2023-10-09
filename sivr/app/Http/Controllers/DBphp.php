<?php

namespace App\Http\Controllers;

use SQLite3;

class DBphp extends SQLite3
{
    function __construct()
    {
        $path = base_path() . DIRECTORY_SEPARATOR . "log" . DIRECTORY_SEPARATOR . "db" . DIRECTORY_SEPARATOR . "WebReqData.db";
        $this->open($path);
    }

    function get_db_one($sql)
    {
        $count = 0;
        $result = $this->query($sql);
        if ($row = $result->fetchArray()) {
            $count = $row[0];
        }
        return $count;
    }

    function get_db_result($sql)
    {
        $row = null;
        $result = $this->query($sql);
        $row = $result->fetchArray();
        return $row;
    }

    function db_update($sql)
    {
        return $this->exec($sql);
    }

}