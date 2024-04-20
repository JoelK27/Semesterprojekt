<?php
include("../models/appointment.php");
class DataHandler
{

   public function queryAppointments()
    {
        $res =  $this->getDemoData();
        return $res;
    }


    public function queryAppointmentsByID($appointment_id)
    {
        $result = array();
        foreach ($this->queryAppointments() as $val) {
            if ($val[0]->appointment_id == $appointment_id) {
                array_push($result, $val);
            }
        }
        return $result;
    }

    public function queryAppointmentsByTitle($title)
    {
        $result = array();
        foreach ($this->queryAppointments() as $val) {
            if ($val[0]->title == $title) {
                array_push($result, $val);
            }
        }
        return $result;
    }

   private static function getDemoData()
    {

        $demodata=[
            [new appointment(1, "Betriebsausflug", "Simmering, Wien", 20-4-2024, 19-4-2024)],
            [new appointment(2, "Wellness", "Ottakring, Wien", 24-4-2024, 21-4-2024)],
            [new appointment(3, "Fußballturnier", "Liesing, Wien", 20-6-2024, 19-5-2024)],
            [new appointment(4, "Wanderausflug", "Marchfeld, Niederösterreich", 20-5-2024, 19-4-2024)],
        ];
        return $demodata;
        
    }
}
