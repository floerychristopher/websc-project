<?php

    $servername = "localhost";
    $username = "root";
    $password = "if23b265";
    $dbname = "appointmentpicker";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);

    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
