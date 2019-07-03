-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 02, 2019 at 11:27 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pms`
--

-- --------------------------------------------------------

--
-- Table structure for table `customProperty`
--

CREATE TABLE `customProperty` (
  `customId` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `owned_by` int(11) NOT NULL DEFAULT '1',
  `ISBN` varchar(100) NOT NULL,
  `serial_number` varchar(100) NOT NULL,
  `req` int(11) NOT NULL,
  `key_` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customProperty`
--

INSERT INTO `customProperty` (`customId`, `status`, `owned_by`, `ISBN`, `serial_number`, `req`, `key_`) VALUES
(3, 2, 1, 'dlksdfjlkj8', 'kldsjf909', 12, '1561985596418'),
(4, 2, 1, 'kajsdfkldfsk', 'klasdjfoidsf', 12, '1561985596418');

-- --------------------------------------------------------

--
-- Table structure for table `custom_request`
--

CREATE TABLE `custom_request` (
  `req_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `step_1` varchar(10) NOT NULL DEFAULT 'waiting',
  `step_2` varchar(10) NOT NULL DEFAULT 'waiting',
  `step_3` varchar(10) NOT NULL DEFAULT 'waiting',
  `quantity` int(11) NOT NULL,
  `step_1_aprover` int(11) NOT NULL,
  `step_2_aprover` int(11) NOT NULL,
  `from_emp` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `custom_request`
--

INSERT INTO `custom_request` (`req_id`, `name`, `model`, `description`, `step_1`, `step_2`, `step_3`, `quantity`, `step_1_aprover`, `step_2_aprover`, `from_emp`, `status`) VALUES
(12, 'camera', 'canone3x', 'i want it to record things', 'accepted', 'accepted', 'waiting', 2, 3, 1, 2, 1),
(13, 'car ', 'gtx mustang', 'kjfalsj', 'waiting', 'waiting', 'waiting', 2, 0, 0, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `dep_id` varchar(50) NOT NULL,
  `dep_name` varchar(50) NOT NULL,
  `manager` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`dep_id`, `dep_name`, `manager`) VALUES
('it', 'information technology', '2');

-- --------------------------------------------------------

--
-- Table structure for table `employes`
--

CREATE TABLE `employes` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `emp_id` varchar(100) NOT NULL,
  `departement` varchar(50) NOT NULL,
  `position` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employes`
--

INSERT INTO `employes` (`id`, `first_name`, `middle_name`, `last_name`, `emp_id`, `departement`, `position`, `username`, `password`) VALUES
(1, 'maria', 'marua', 'sdal', '4554', 'it', 'manager', 'vi', 'vi'),
(2, 'mekdem', 'emashetew', 'wendemu', '4848', 'it', 'employe', 'mk', 'mk'),
(3, 'mente', 'ambachew', 'shuluka', '8990', 'it', 'department', 'me', 'me'),
(4, 'redi', 'tsgaye', 'ambachew', '4', 'it', 'store', 're', 're'),
(5, 'BEZENASH', 'TESFAYE', 'TESEMA', '9879', 'it', 'employe', 'bz', 'bz');

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `ISBN` varchar(50) NOT NULL,
  `model` int(11) NOT NULL,
  `serial_number` varchar(100) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'store',
  `owned_by` int(11) NOT NULL DEFAULT '1',
  `key_` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`ISBN`, `model`, `serial_number`, `status`, `owned_by`, `key_`) VALUES
('09dufioaufd9adi', 35, '098faoadisiofu', '3', 1, '1561976220354'),
('09sfu09ioias', 34, 'iofuaio0asdf', '2', 2, '15619857387607868'),
('4564566b', 46, '75676567', 'store', 1, ''),
('5766567gh67', 46, 'ytutyutyyu', 'store', 1, '1561985989514'),
('789-adj-i09-0i09i', 32, 'io9-0js-dlk-fa-sdfi', 'store', 1, '1561974591181'),
('789af-afl-afajla-af', 32, 'kaf90-sfalaf-sdfkj', 'store', 1, '1561974591181'),
('88sdfoiuiosfa', 34, '90sduafsiuio', 'store', 1, '1561975862397'),
('890a8djfklajkla900', 45, 'fdsklaj908sdf90a', 'store', 1, '1561983937526'),
('897-jKi-lsd-afi-oa', 32, 'lao-s99a-sdf-kjkll', 'store', 1, '1561974591181'),
('89d7sfoiafiojsio', 35, '89sfsadfjiou90', 'store', 1, '1561976220354'),
('89fsuad89fua89', 40, '8dfu9s8a9uf9', 'store', 1, '1561977448142'),
('8ahfjakkfa879', 33, '908sdjkfjlala', 'store', 1, '1561975399339'),
('8sd7f9ioafioj9009', 36, '098df90a90if', 'store', 1, '1561976464622'),
('908adfipoaid90f', 42, 'klsi9809jdfjoiaj0', 'store', 1, '1561983107271'),
('90d8sfai0af9ia0', 37, '90ifda90if0a9if', 'store', 1, '1561976640031'),
('90dif09ai09ia', 43, '90if9aipodfiop', 'store', 1, '1561983576294'),
('90difjfalk90adfjklak', 45, 'kld98908490iufja', 'store', 1, '1561983937526'),
('90f890aifi90a90fi', 36, '90fis90ai90sd', 'store', 1, '1561976464622'),
('90fiad90if90a9afa', 36, '90isd90i9009fi', 'store', 1, '1561976464622'),
('90iadia09if0a', 43, 'jadf890adifipa', 'store', 1, '1561983576294'),
('90iasf9ia9ida00a', 37, '90dias09fia90sd', 'store', 1, '1561976640031'),
('90sdf09i9sf0', 33, '90fiaf90afkj', 'store', 1, '1561975399339'),
('90sdffioasdjfioasdf', 39, 'fioasd90sd8f9sa', 'store', 1, '1561977274931'),
('90sf8jsdfjklfsdj', 34, 'oisfisd90f90s', 'store', 1, '1561975862397'),
('987ajfklklaoidjfl09a', 44, 'kla90dfkja90akl', 'store', 1, '1561983770148'),
('9890jkflakkfio', 33, 'fdsjkjsdaklp', 'store', 1, '1561975399339'),
('9ifa90fia90dia0', 37, '9iasdf90ia90ifi0a', 'store', 1, '1561976640031'),
('d90fajklfja09dkfl0a', 44, 'lkf90ajkldfj90adj', 'store', 1, '1561983770148'),
('dsfiaf89adf90id90i', 36, 'iosdfuiosdfu0a', 'store', 1, '1561976464622'),
('dsfkljsd897sdiofi', 38, 'fkjhdsf78fyuas', 'store', 1, '1561977010927'),
('fak8f9sdfia89ifsd', 45, '8fad90skjafsd09', 'store', 1, '1561983937526'),
('fakl89-dsfk-sfk-askl', 32, 'jfa0-dfka-dsfakl-al', 'store', 1, '1561974591181'),
('fiosdaufisadf89sd7f', 41, 'fsdfuoiasdjfiosdajio', 'store', 1, '1561977716804'),
('fsdios8f989sd', 34, '89sd89u9a8d', 'store', 1, '1561975862397'),
('i90sdif90sadfkllka', 38, 'idjsioasdjfioaf8', 'store', 1, '1561977010927'),
('ijfiosdjfiosdaf87sdf98', 41, 'dsajfsdjafjasdfkljsd', 'store', 1, '1561977716804'),
('iofau98usdfioua', 35, 's90df890sdufi', 'store', 1, '1561976220354'),
('iosdu89fuua98', 34, '89usdioiuoiafio', 'store', 1, '1561975862397'),
('jflkja90afdiiou', 34, 'iodf9098d09', 'store', 1, '1561975862397'),
('jklafd09iad90fip', 42, 'podf-0a0-odfjall', 'store', 1, '1561983107272'),
('kjfio89a890aii', 43, '9iad09ia09ia0', 'store', 1, '1561983576294'),
('kjsdf89asfoiasdfs', 38, '98udsfiojasdfj', 'store', 1, '1561977010927'),
('kl9a08f90j90', 33, 'i09ai09ai9i9', 'store', 1, '1561975399339'),
('kla9af-adfkldf-falk', 32, 'lkadf-dsfkl-dfkla9', 'store', 1, '1561974591181'),
('kld-f90-0a-fa-asd', 32, '90a-dfk-j9as-jf90k', 'store', 1, '1561974591181'),
('kljdaioijad90f8ap', 42, 'opidfop908dfi0a', 'store', 1, '1561983107272'),
('klsd987a89dfoi', 35, '8dfa09jifoajo', 'store', 1, '1561976220354'),
('laf9asdfjkljjkl', 34, 'lkdfj90a90u', 'store', 1, '1561975862397'),
('lk900a-dfklasfa-ds', 32, 'jkfa-dsfk-oia9a-al', 'store', 1, '1561974591181'),
('lkdjf8789ajkfjl90', 42, 'lkdf098afjlaf090', 'store', 1, '1561983107271'),
('lkdsf89dsufiosdjf09', 39, '90fsdiofja9df009', 'store', 1, '1561977274931'),
('ofasd9fasfiosdfio', 38, 'ddfkl89890fa0', 'store', 1, '1561977010927'),
('oisudfoasiu00', 34, 'jaklsd0098fa0', 'store', 1, '1561975862397'),
('osidu89suduf9', 34, 'uf89usdf89u89', 'store', 1, '1561975862397'),
('sdfjk879asdf789', 40, '98dsu89uaf89', 'store', 1, '1561977448142'),
('sdfsadif9809sd', 37, '908sdfa90i90a', 'store', 1, '1561976640031'),
('sf8979asudiofuoas', 39, 'klfa890d90fi09a0', 'store', 1, '1561977274931'),
('sfjalkfsdf98a7sdf89', 41, '89dsf7adfiouioasd', 'store', 1, '1561977716804'),
('stiva-908a90', 33, 'indica-akflj', 'store', 1, '1561975399339'),
('uidosufioadfiodskjf', 39, 'aiodsuf0890adf8', 'store', 1, '1561977274931'),
('yutuytyrtyr', 46, 'tyytryrytrtyr', 'store', 1, '1561985989514');

-- --------------------------------------------------------

--
-- Table structure for table `property_class`
--

CREATE TABLE `property_class` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `type` varchar(100) NOT NULL DEFAULT 'temporary',
  `duration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `property_class`
--

INSERT INTO `property_class` (`id`, `name`, `description`, `type`, `duration`) VALUES
(18, 'Labtop', 'A laptop, also called a notebook computer or just notebook, is a small, portable personal computer with a \"clamshell\" form factor, having, typically, a thin LCD or LED computer screen mounted on the inside of the upper lid of the \"clamshell\" and an alphanumeric keyboard on the inside of the lower lid.', 'Temporary', 35),
(19, 'Desktop computer', 'A desktop computer is a personal computer designed for regular use at a single location on or near a desk or table due to its size and power requirements. The most common configuration has a case that houses the power supply, motherboard, disk storage; a keyboard and mouse for input; and a computer monitor, speakers, and, often, a printer for output. The case may be oriented ', 'Temporary', 35),
(20, 'Chair', 'A chair is a piece of furniture with a raised surface supported by legs, commonly used to seat a single person. Chairs are supported most often by four legs and have a back; however, a chair can have three legs or can have a different shape', 'Temporary', 12),
(21, 'Desk', 'A desk or bureau is a piece of furniture with a flat table-style work surface used in a school, office, home or the like for academic, professional or domestic activities such as reading, writing, or using equipment such as a computer.', 'Temporary', 22),
(22, 'Camera', 'A camera is an optical instrument for recording or capturing images, which may be stored locally, transmitted to another location, or both. The images may be individual still photographs or sequences of images constituting videos or movies. The camera is a remote sensing device as it senses subjects without any contact', 'Temporary', 23),
(23, 'Chir', 'idsfa iofd  asoidfu oisdfu oi fauoif sidfou sadfiou ', 'Temporary', 23);

-- --------------------------------------------------------

--
-- Table structure for table `property_model`
--

CREATE TABLE `property_model` (
  `id` int(11) NOT NULL,
  `class` int(11) NOT NULL,
  `model` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `quantity_` int(11) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `property_model`
--

INSERT INTO `property_model` (`id`, `class`, `model`, `name`, `description`, `quantity_`, `image`) VALUES
(32, 18, 'Satellite A665', 'Toshiba Satellite', 'The Toshiba Satellite was a line of consumer-grade notebook computers marketed by Toshiba, and were some of the earliest laptops, introduced in the early-1990s, to compete with the IBM Thinkpad line. Models in the Satellite family varied greatly - from entry-level models sold at major retailers to full-fledged media ', 5, '1561974591091.jpeg'),
(33, 18, 'Envy X360', 'HP Envy', 'The HP Envy series is a line of laptops and other products manufactured and sold by Hewlett-Packard. HP originally launched the line on October 15, 2009 with two high-performance models, the Envy 13 and the Envy 15. These models replaced the Voodoo Envy when HP and VoodooPC merged', 3, '1561975399268.jpeg'),
(34, 18, 'Dell alienware 17', 'Dell', 'Alienware is an American computer hardware subsidiary of Dell. Their products are designed for gaming and can be identified by their alien-themed designs. Alienware was founded in 1996 by Nelson Gonzalez and Alex Aguila.', 7, '1561975862336.jpeg'),
(35, 18, 'omen 789alx', 'Omen', 'Alienware is an American computer hardware subsidiary of Dell. Their products are designed for gaming and can be identified by their alien-themed designs. Alienware was founded in 1996 by Nelson Gonzalez and Alex Aguila.', 2, '1561976220315.jpeg'),
(36, 18, 'MacBook pro 7812', 'MacBook pro', 'The MacBook Pro is a line of Macintosh portable computers introduced in January 2006 by Apple Inc. It is the high-end model of the MacBook family and is currently available in 13- and 15-inch screen sizes. A 17-inch version was available between April 2006 and June 2012', 2, '1561976464556.jpeg'),
(37, 18, 'MacBook air 2017', 'MacBook', 'The MacBook Pro is a line of Macintosh portable computers introduced in January 2006 by Apple Inc. It is the high-end model of the MacBook family and is currently available in 13- and 15-inch screen sizes. A 17-inch version was available between April 2006 and June 2012', 2, '1561976639954.jpeg'),
(38, 22, 'Canon EOS', 'Canone', 'The Canon (Natalie Angier book), a 2007 science book; The Canon of Medicine, a medical text written by Ibn Sina (Avicenna) The Western Canon: The Books and School of the Ages, a 1994 book by Harold Bloom; Collections or lists. Canon of Dutch History, 50 topics to be ', 2, '1561977010873.jpeg'),
(39, 22, 'Sony FDR-AX1', 'Sony', 'Sony ? system cameras and lenses. Konica Minolta used different brand names depending on distribution regions for their DSLR cameras. Sony decided to use a unified global brand name for their DSLR cameras and chose the name ?, pronounced alpha. This was the name used by Minolta in Japan and China.', 2, '1561977274864.jpeg'),
(40, 19, 'Dell Optiplex 745', 'Dell', 'Dell is an American multinational computer technology company based in Round Rock, Texas, United States, that develops, sells, repairs, and supports computers and related products and services', 0, '1561977448094.jpeg'),
(41, 19, 'macDesktop 2012', 'MacDesktop', 'Many people prefer a desktop computer for several reasons, including the benefit of more powerful processing chip options, and more extensive memory and storage capacity than other types of computers. The best desktop computers also offer optimum flexibility for configuration upgrades and incorporating peripherals.', 1, '1561977716749.jpeg'),
(42, 22, 'canone Kx45', 'Canone', 'A video camera is a camera used for electronic motion picture acquisition, initially developed for the television industry but now common in other applications as well.', 2, '1561983106977.jpeg'),
(43, 22, 'Sony erecson ', 'Sony', 'Sony offers a number of interchangeable-lens cameras in its ? (Alpha) line. The line has featured cameras employing three different imaging technologies and two mounts: Digital single-lens reflex cameras (DSLR) - early ? models with three-digit model numbers employ this technology; they all feature Sony\'s A-mount.', 1, '1561983576196.jpeg'),
(44, 21, 'desk stone X-87', 'Madison Desk', 'A desk or bureau is a piece of furniture with a flat table-style work surface used in a school, office, home or the like for academic, professional or domestic activities such as reading, writing, or using equipment such as ', 0, '1561983770088.jpeg'),
(45, 21, 'acera 78al', 'Computer Desk', 'A desk or bureau is a piece of furniture with a flat table-style work surface used in a school, office, home or the like for academic, professional or domestic activities such as reading, writing, or using equipment such as ', 1, '1561983937464.jpeg'),
(46, 23, 'arm chair 555', 'arm cahir', 'chair that have ar', 3, '1561985989411.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `req_id` int(11) NOT NULL,
  `from_emp` int(11) NOT NULL,
  `step_1_aprover` int(11) NOT NULL,
  `step_2` varchar(10) NOT NULL DEFAULT 'waiting',
  `step_1` varchar(10) NOT NULL DEFAULT 'waiting',
  `step_2_aprover` int(11) NOT NULL,
  `model` int(11) NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL DEFAULT '1',
  `step_3` varchar(10) NOT NULL DEFAULT 'waiting',
  `description` varchar(500) NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`req_id`, `from_emp`, `step_1_aprover`, `step_2`, `step_1`, `step_2_aprover`, `model`, `quantity`, `step_3`, `description`, `status`) VALUES
(86, 3, 3, 'accepted', 'accepted', 1, 42, 1, 'waiting', 'i need it for recording purpose', 2),
(87, 2, 3, 'waiting', 'accepted', 0, 37, 1, 'waiting', 'i need it for designing purpuse\n', 1),
(88, 2, 3, 'accepted', 'accepted', 1, 39, 1, 'waiting', 'i will use it to record things', 2),
(89, 2, 3, 'waiting', 'accepted', 0, 43, 2, 'waiting', 'bl blabla', 1),
(90, 1, 0, 'waiting', 'waiting', 0, 46, 1, 'waiting', 'uiyui', 1);

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `storeName` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `keeper` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`storeName`, `location`, `keeper`, `id`) VALUES
('ebc store1', 'ebc ground flore', 4, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customProperty`
--
ALTER TABLE `customProperty`
  ADD PRIMARY KEY (`customId`);

--
-- Indexes for table `custom_request`
--
ALTER TABLE `custom_request`
  ADD PRIMARY KEY (`req_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`dep_id`);

--
-- Indexes for table `employes`
--
ALTER TABLE `employes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `emp_id` (`emp_id`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`ISBN`),
  ADD KEY `class` (`model`);

--
-- Indexes for table `property_class`
--
ALTER TABLE `property_class`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `property_model`
--
ALTER TABLE `property_model`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`req_id`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customProperty`
--
ALTER TABLE `customProperty`
  MODIFY `customId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `custom_request`
--
ALTER TABLE `custom_request`
  MODIFY `req_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `employes`
--
ALTER TABLE `employes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `property_class`
--
ALTER TABLE `property_class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `property_model`
--
ALTER TABLE `property_model`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `req_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
