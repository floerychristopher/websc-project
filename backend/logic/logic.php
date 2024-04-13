<?php

    include("./db/dataHandler.php");

    class Logic
    {
        private $dh;
        function __construct()
        {
            $this->dh = new DataHandler();
        }

        function handleRequest($method)
        {
            switch ($method) {
                case "queryAppointments":
                    $result = $this->dh->queryAppointments();
                    break;
                default:
                    $result = null;
                    break;
            }
            return $result;
        }
    }

?>