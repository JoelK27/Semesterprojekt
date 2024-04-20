<?php
class appointment {
    public $appointment_id;
    public $title;
    public $location;
    public $date;
    public $voting_expiry_date;

    function __construct($appointment_id, $title, $location, $date, $voting_expiry_date) {
        $this->appointment_id = $appointment_id;
        $this->title = $title;
        $this->location=$location;
        $this->date=$date;
        $this->voting_expiry=$voting_expiry_date;
      }
}
