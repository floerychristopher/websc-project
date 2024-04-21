<?php

    require_once("./models/appointment.php");

    class DataHandler
    {
        public function queryAppointments()
        {
            $result = self::getData();
            return $result;
        }

        public function deleteAppointment($appointmentId)
        {
            $result = self::deleteRow($appointmentId);
            return $result;
        }

        private static function getData() 
        {
            require_once("dbconn.php");
            $sql = "SELECT a_id, a_title, a_location, a_date, a_expirationDate, a_duration, a_description FROM appointment";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_bind_result($stmt, $id, $title, $location, $date, $expirationDate, $duration, $description);
            $appointments = [];
            while(mysqli_stmt_fetch($stmt)) {
                $appointments[] = [
                    "id" => $id,
                    "title" => $title, 
                    "location" => $location,
                    "date" => $date,
                    "expirationDate" => $expirationDate,
                    "duration" => $duration,
                    "description" => $description
                ];
            }
            mysqli_stmt_close($stmt);
            mysqli_close($conn);
            return $appointments;
        }

        private static function deleteRow($appointmentId) 
        {
            require_once("dbconn.php");
            $sql = "DELETE FROM appointment WHERE a_id = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "i", $appointmentId);
            if(mysqli_stmt_execute($stmt)) {
                return true;
            } else {
                return false;
            }
        }
    }
?>