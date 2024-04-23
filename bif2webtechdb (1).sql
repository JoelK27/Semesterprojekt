-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 23. Apr 2024 um 15:38
-- Server-Version: 10.4.32-MariaDB
-- PHP-Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `bif2webtechdb`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `voting_expiry_date` date DEFAULT NULL,
  `startingTime` time DEFAULT NULL,
  `endTime` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Daten für Tabelle `appointments`
--

INSERT INTO `appointments` (`appointment_id`, `title`, `location`, `date`, `voting_expiry_date`, `startingTime`, `endTime`) VALUES
(1, 'Lukas aichbauer fetzen', 'Fh technikum', '2024-04-20', '2024-04-19', '09:00:00', '17:00:00'),
(2, 'Betriebsausflug', 'Simmering, Wien', '2024-04-20', '2024-04-19', '10:00:00', '18:00:00'),
(3, 'Wellness', 'Ottakring, Wien', '2024-04-24', '2024-04-21', '11:00:00', '19:00:00'),
(4, 'Fußballturnier', 'Liesing, Wien', '2024-06-20', '2024-05-19', '12:00:00', '20:00:00'),
(5, 'Wanderausflug', 'Marchfeld, Niederösterreich', '2024-05-20', '2024-04-19', '13:00:00', '21:00:00'),
(6, 'Mit DJ Ötzi Neanderthaler suchen', 'Himalaya, Nepal', '2024-04-26', '2024-04-23', '18:00:00', '22:00:00');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `appointment_info`
--

CREATE TABLE `appointment_info` (
  `appointment_id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `comment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`);

--
-- Indizes für die Tabelle `appointment_info`
--
ALTER TABLE `appointment_info`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `appointment_info`
--
ALTER TABLE `appointment_info`
  ADD CONSTRAINT `foreign key` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`appointment_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
