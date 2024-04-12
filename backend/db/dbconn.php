<?php

    class Database
    {
        private $host = "localhost";
        private $username = "root";
        private $password = "";
        private $dbname = "appointmentpicker";
        private $conn;

        public function getConnection()
        {
            $this->conn = null;
            try {
                $this->conn = new mysqli($this->host, $this->username, $this->password, $this->dbname);
                //Check connection
                if ($this->conn->connect_error) {
                    throw new Exception("Connection failed: " . $this->conn->connect_error);
                }
            //Catch error and display it
            } catch (Exception $error) {
                echo "Error: " . $error->getMessage();
            }
            //Return connection
            return $this->conn;
        }
    }

    $database = new Database();
    $conn = $database->getConnection();

    if ($conn) {
        echo "Connected successfully";
    } else {
        echo "Connection failed";
    }
    
?>