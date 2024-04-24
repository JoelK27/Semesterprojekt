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
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $res[] = new Appointment($row["appointment_id"], $row["title"], $row["location"], $row["date"], $row["voting_expiry_date"], $row["startingTime"], $row["endTime"]);
            }
        }
        return $res;
    }

    public function queryAppointmentID( $appointment_id){
        $res = array();
        $sql = "SELECT * FROM appointments WHERE appointment_id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $appointment_id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $res[] = new Appointment($row["appointment_id"], $row["title"], $row["location"], $row["date"], $row["voting_expiry_date"], $row["startingTime"], $row["endTime"]);
            }
        }
        return $res;
    }
}
?>