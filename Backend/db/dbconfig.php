<?php
$db_host = "localhost";
$db_user = "bif2webscriptinguser";
$db_password = "bif2021";
$db_name = "bif2webtechdb";

// Verbindung zur Datenbank herstellen
$conn = new mysqli($db_host, $db_user, $db_password, $db_name);

// Verbindung überprüfen
if ($conn->connect_error) {
    die("Verbindung zur Datenbank fehlgeschlagen: " . $conn->connect_error);
}

// Beispielabfrage: Alle Termine abrufen
$sql = "SELECT * FROM appointments";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Daten ausgeben
    while($row = $result->fetch_assoc()) {
        echo "Termin: " . $row["title"] . " - Ort: " . $row["location"] . "<br><p>";
        echo "Datum: " . $row["date"] . " - Voting bis: " . $row["voting_expiry_date"] . "<br><p>";
    }
} else {
    echo "Keine Termine gefunden.";
}

// Verbindung schließen
$conn->close();
?>
