<?php
include("./models/appointment.php");
include("./models/appointmentInfo.php");
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
        $sql = "SELECT appointments.*, appointment_info.username, appointment_info.comment 
                FROM appointments 
                LEFT JOIN appointment_info ON appointments.appointment_id = appointment_info.appointment_id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $appointments = array();
            while($row = $result->fetch_assoc()) {
                $appointmentId = $row["appointment_id"];
                if (!isset($appointments[$appointmentId])) {
                    $appointment = new Appointment($appointmentId, $row["title"], $row["location"], $row["date"], $row["voting_expiry_date"], $row["startingTime"], $row["endTime"]);
                    $appointments[$appointmentId] = array(
                        'appointment' => $appointment,
                        'usernames' => array(),
                        'comments' => array()
                    );
                }
                $appointments[$appointmentId]['usernames'][] = $row["username"];
                $appointments[$appointmentId]['comments'][] = $row["comment"];
            }
            foreach ($appointments as $appointment) {
                $res[] = new AppointmentInfo($appointment['appointment'], $appointment['usernames'], $appointment['comments']);
            }
        }
        return $res;
    }

}
?>