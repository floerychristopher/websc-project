<?php

    require_once("./logic/logic.php");

    $method = "";
    $appointmentId = null;

    isset($_GET["method"]) ? $method = $_GET["method"] : false;
    isset($_POST["method"]) ? $method = $_POST["method"] : false;
    isset($_POST["id"]) ? $appointmentId = $_POST["id"] : false;

    $logic = new logic();
    $result = $logic->handleRequest($method, $appointmentId);
    if ($result == null || !$result) {
        response("GET", 400, null);
    } else {
        response("GET", 200, $result);
    }

    function response($method, $httpStatus, $data)
    {
        header('Content-Type: application/json');
        switch ($method) {
            case "GET":
                http_response_code($httpStatus);
                echo json_encode($data);
                break;
            default:
                http_response_code(405);
                echo "Method not supported yet!";
        }
    }
    
?>