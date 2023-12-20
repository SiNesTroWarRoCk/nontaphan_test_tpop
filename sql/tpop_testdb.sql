-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 20, 2023 at 05:41 PM
-- Server version: 5.7.33
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tpop_testdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `event_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT '2' COMMENT 'enable = 2 , disable = 1',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `event_name`, `description`, `status`, `date`) VALUES
(1, 'MONET & FRIENDS ALIVE\r\nCOMES TO LIFE AT ICONSIAM, BANGKOK', 'Created and produced by Grande Experiences, Monet & Friends Alive is a multi-sensory experience to entertain the whole family. the french impressionists’ works have been displayed and enjoyed worldwide for more than 150 years – but never like this.  For a limited time only at ICONSIAM, Bangkok visitors can indulge their senses with the sights and sounds of 19th-century Europe as seen through the eyes of Claude Monet and the Impressionist painters.', 2, '2023-12-20 09:31:05'),
(2, 'WHITE PARTY BANGKOK', 'WHITE PARTY BANGKOK - Thailand\'s iconic dance festival returns with FIRST CONTACT, a captivating cosmic journey of extraterrestrial beings seeking life on a thriving planet. For eons, these celestial voyagers have roamed across galaxies and ventured amidst the stars, until the mesmerizing melodies of our music reverberated through the cosmos and captivated their senses, revealing the existence of humanity.', 2, '2023-12-20 09:33:18'),
(3, '[BKK] NUTCRACKER - INTERNATIONAL BALLET WEEK IN THAILAND ST.PETERSBURG STATE ACADEMIC LEONID JACOBSON', 'hailand\'s International Ballet Week! \r\n\r\nIn December 2023, Bangkok will host a unique event - the tour of the St. Petersburg State Academic Ballet Theatre named after Leonid Yakobson as part of the Russian Ballet Week in Thailand.\r\n\r\nThe festival of Russian ballet will be an incredible combination of history and modern culture. It will include entertainment and magnificent performances by world-class artists.', 2, '2023-12-20 09:33:41');

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `eventId` int(11) DEFAULT NULL,
  `seatId` int(11) DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `seat`
--

CREATE TABLE `seat` (
  `id` int(11) NOT NULL,
  `zone` varchar(255) NOT NULL,
  `eventId` int(11) DEFAULT NULL,
  `row` int(11) NOT NULL,
  `seat_number` int(11) NOT NULL,
  `is_available` int(11) NOT NULL DEFAULT '2' COMMENT 'available =2 , reserved = 1',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_529dceb01ef681127fef04d755d` (`userId`),
  ADD KEY `FK_eda8fcaaa71703a532e1c9eca0a` (`eventId`),
  ADD KEY `FK_70ef2f828ce6c1caa4646cf4801` (`seatId`);

--
-- Indexes for table `seat`
--
ALTER TABLE `seat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_6f9180da82fbdeb46141993f679` (`eventId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seat`
--
ALTER TABLE `seat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `FK_529dceb01ef681127fef04d755d` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_70ef2f828ce6c1caa4646cf4801` FOREIGN KEY (`seatId`) REFERENCES `seat` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_eda8fcaaa71703a532e1c9eca0a` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `seat`
--
ALTER TABLE `seat`
  ADD CONSTRAINT `FK_6f9180da82fbdeb46141993f679` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
