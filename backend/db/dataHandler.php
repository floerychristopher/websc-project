<?php

    require_once("./models/appointment.php");

    class DataHandler
    {
        public function queryDemoAppointments()
        {
            $result = self::getDemoData();
            return $result;
        }
        public function queryAppointments()
        {
            $result = self::getData();
            return $result;
        }

        private static function getData() 
        {
            require_once("dbconn.php");
            $sql = "SELECT a_id, a_title, a_location, a_expirationDate, a_date, a_startTime, a_endTime FROM appointment";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_bind_result($stmt, $id, $title, $location, $expirationDate, $date, $startTime, $endTime);
            $appointments = [];
            while(mysqli_stmt_fetch($stmt)) {
                $appointments[] = [
                    "id" => $id,
                    "title" => $title, 
                    "location" => $location,
                    "expirationDate" => $expirationDate,
                    "date" => $date,
                    "startTime" => $startTime,
                    "endTime" => $endTime
                ];
            }
            mysqli_stmt_close($stmt);
            mysqli_close($conn);
            return $appointments;
        }
    }
?>