<?php
include("db/dataHandler.php");

class SimpleLogic
{

    private $dh;

    function __construct()
    {
        $this->dh = new DataHandler();
    }

    function handleRequest($method, $param)
    {
        try {
            switch ($method) {
    
                case "queryAppointments":
                    $res = $this->dh->queryAppointments();
                    break;
    
                case "queryAppointmentsByID":
                    $res = $this->dh->queryAppointmentsByID($param);
                    break;
    
                case "queryAppointmentsByTitle":
                    $res = $this->dh->queryAppointmentsByTitle($param);
                    break;
    
                default:
                    $res = null;
                    break;
            }
            return $res;
        } catch (Exception $e) {
            // Log the error message
            error_log($e->getMessage());
            // Return a JSON error message
            return json_encode(['error' => $e->getMessage()]);
        }
    }
}
