<?php

    include("./models/appointment.php");
    class DataHandler
    {
        public function queryDemoAppointments()
        {
            $result = self::getDemoData();
            return $result;
        }

        //Demo data for testing
        private static function getDemoData()
        {
            $demodata = [
                [new Appointment(1, "Meeting", "Room 1", "2024-04-12", "09:00", "10:00")],
                [new Appointment(2, "Consultation", "Room 2", "2024-04-13", "11:00", "12:00")],
                [new Appointment(3, "Team Talk", "Room 3", "2024-04-14", "14:00", "15:00")],
                [new Appointment(4, "Training", "Room 4", "2024-04-15", "16:00", "17:00")],
            ];
            return $demodata;
        }
    }

?>