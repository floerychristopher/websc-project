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
                case "queryDemoAppointments":
                    $result = $this->dh->queryDemoAppointments();
                    break;
                default:
                    $result = null;
                    break;
            }
            return $result;
        }
    }

?>