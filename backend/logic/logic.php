<?php

    include("./db/dataHandler.php");

    class Logic
    {
        private $dh;
        function __construct()
        {
            $this->dh = new DataHandler();
        }

        function handleRequest($method, $appointmentId)
        {
            switch ($method) {
                case "queryAppointments":
                    $result = $this->dh->queryAppointments();
                    break;
                case "deleteAppointment":
                    $result = $this->dh->deleteAppointment($appointmentId);
                    break;
                default:
                    $result = null;
                    break;
            }
            return $result;
        }
    }
?>