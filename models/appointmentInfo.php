<?php
class AppointmentInfo {
    public $appointment;
    public $usernames;
    public $comments;
    function __construct($appointment, $usernames, $comments) {
        $this->appointment = $appointment;
        $this->usernames = $usernames;
        $this->comments = $comments;
    }
}
?>