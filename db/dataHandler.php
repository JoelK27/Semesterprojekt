<?php
include("./models/person.php");
include("./db/dbConnection.php");

class DataHandler
{
    private $conn;

    function __construct()
    {
        global $conn;
        $this->conn = $conn;
    }

    public function queryAppointments()
    {
        $res = array();
        $sql = "SELECT * FROM appointments";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $res[] = new Appointment($row["appointment_id"], $row["title"], $row["location"], $row["date"], $row["voting_expiry_date"], $row["startingTime"], $row["endTime"]);
            }
        }
        return $res;
    }
}