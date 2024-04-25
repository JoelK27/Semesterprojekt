<?php
class Appointment {
    public $appointment_id;
    public $title;
    public $location;
    public $date;
    public $voting_expiry_date;
    public $startingTime;
    public $endTime;

    function __construct($appointment_id, $title, $location, $date, $voting_expiry_date, $startingTime, $endTime) {
        $this->appointment_id = $appointment_id;
        $this->title = $title;
        $this->location = $location;
        $this->date = $date;
        $this->voting_expiry_date = $voting_expiry_date;
        $this->startingTime = $startingTime;
        $this->endTime = $endTime;
    }
}
?>
