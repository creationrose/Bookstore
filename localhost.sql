-- phpMyAdmin SQL Dump
-- version 4.0.4.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 05, 2015 at 04:30 AM
-- Server version: 5.6.13
-- PHP Version: 5.4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `bookstore`
--
CREATE DATABASE IF NOT EXISTS `bookstore` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `bookstore`;

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE IF NOT EXISTS `books` (
  `ISBN` bigint(24) NOT NULL,
  `TITLE` varchar(64) NOT NULL,
  `AUTHOR` varchar(64) NOT NULL,
  `PUBLISHER` varchar(64) NOT NULL,
  `WS_PRICE` float NOT NULL,
  `RET_PRICE` float NOT NULL,
  `QUANTITY` int(8) NOT NULL,
  PRIMARY KEY (`ISBN`),
  UNIQUE KEY `ISBN` (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`ISBN`, `TITLE`, `AUTHOR`, `PUBLISHER`, `WS_PRICE`, `RET_PRICE`, `QUANTITY`) VALUES
(439023483, 'The Hunger Games', 'Suzanne Collins', 'Scholastic Press', 5, 17.99, 5),
(439023491, 'Catching Fire', 'Suzanne Collins', 'Scholastic Press', 5, 17.99, 5),
(439023513, 'Mockingjay', 'Suzanne Collins', 'Scholastic Press', 5, 17.9, 5),
(9780060850524, 'Brave New World', 'Aldous Huxley', 'Harper Collins', 5.44, 10.98, 0),
(9780140177398, 'Of Mice and Men', 'John Steinbeck', 'Penguin Group', 4, 10, 3),
(9780141040356, 'Wuthering Heights', 'Emily Bronte', 'Penguin Group', 6.19, 13.94, 16),
(9780141196909, 'A Tale of Two Cities', 'Charles Dickens', 'Penguin Group', 6.95, 13.94, 2),
(9780143039433, 'The Grapes of Wrath', 'John Steinbeck', 'Penguin Group', 6.62, 13.98, 7),
(9780316015844, 'Twilight', 'Stephenie Meyer', 'Little, Brown Books', 4.5, 10.99, 10),
(9780316024969, 'New Moon', 'Stephenie Meyer', 'Little, Brown Books', 4.5, 10.99, 15),
(9780316027656, 'Eclipse', 'Stephenie Meyer', 'Little, Brown Books', 6.85, 12.99, 13),
(9780316067935, 'Breaking Dawn', 'Stephenie Meyer', 'Little, Brown Books', 6.98, 14.99, 12),
(9780316769488, 'The Catcher in the Rye', 'J.D. Salinger', 'Little, Brown Books', 3.45, 6.99, 2),
(9780393964585, 'Frankenstein', 'Mary Shelley', 'Norton & Company', 7.52, 15, 2),
(9780393976045, 'Pride and Prejudice', 'Jane Austen', 'Norton & Co.', 6.16, 13.36, 20),
(9780439064873, 'Harry Potter and the Chamber of Secrets', 'J. K. Rowling', 'Scholastic', 3.99, 8.98, 2),
(9780439136365, 'Harry Potter and the Prisoner of Azkaban', 'J. K. Rowling', 'Scholastic', 3.35, 8.98, 3),
(9780439139601, 'Harry Potter and the Goblet of Fire', 'J. K. Rowling', 'Scholastic', 5.15, 10.98, 4),
(9780439358064, 'Harry Potter and the Order of the Phoenix', 'J. K. Rowling', 'Scholastic', 5.15, 10.98, 5),
(9780439785969, 'Harry Potter and the Half-Blood Prince', 'J. K. Rowling', 'Scholastic', 5.15, 10.98, 6),
(9780446310789, 'To Kill a Mockingbird', 'Harper Lee', 'Grand Central', 3.95, 7.99, 0),
(9780449213940, 'All Quiet on the Western Front', 'Erich Maria Remarque', 'Random House', 2.45, 6.99, 18),
(9780451524935, '1984', 'George Orwell', 'Penguin Group', 4.98, 9.99, 0),
(9780545139700, 'Harry Potter and the Deathly Hallows', 'J. K. Rowling', 'Scholastic', 5.15, 10.98, 7),
(9780553210798, 'The Adventures of Huckleberry Finn', 'Mark Twain', 'Random House', 3.05, 5.99, 12),
(9780590353427, 'Harry Potter and the Sorcerer''s Stone', 'J. K. Rowling', 'Scholastic', 3.99, 7.99, 1),
(9780679602866, 'Don Quixote', 'Miguel de Cervantes', 'Random House', 13.45, 26.95, 1),
(9780684801223, 'The Old Man and the Sea', 'Ernest Hemingway', 'Scribner', 4.18, 10.98, 0),
(9780684830681, 'Gone with the Wind', 'Margaret Mitchell', 'Scribner', 14.47, 30, 8),
(9780743273565, 'The Great Gatsby', 'F. Scott Fitzgerald', 'Scribner', 6.12, 13.98, 0),
(9781400092727, 'Moby Dick', 'Herman Melville', 'Random House', 5.45, 11.95, 9),
(9781402712364, 'Little Women', 'Louisa May Alcott', 'Sterling Publishing', 3.12, 5.95, 8),
(9781402714566, 'The Merry Adventures of Robin Hood', 'Howard Pyle', 'Sterling', 4.45, 9.45, 11),
(9781402714573, 'Treasure Island', 'Robert Louis Stevenson', 'Sterling', 4.5, 8.95, 10),
(9781402726620, 'Gulliver''s Travels', 'Jonathan Swift', 'Sterling', 3.45, 5.95, 15),
(9781402736957, 'The Three Musketeers', 'Alexandre Dumas', 'Sterling Publishing', 3.14, 5.95, 18),
(9781416500186, 'The Good Earth', 'Pearl S. Buck', 'Simon & Schuster', 3.98, 6.99, 0),
(9781593080815, 'Crime and Punishment', 'Fyodor Dostoevsky', 'Barnes & Noble', 4.42, 8.95, 2),
(9781593081140, 'Dracula', 'Bram Stoker', 'Barnes & Noble', 3.12, 6.25, 4),
(9781593081218, 'Uncle Tom’s Cabin', 'Harriet Beecher Stowe', 'BiblioBazaar', 22.95, 46.99, 0),
(9781593081379, 'Last of the Mohicans', 'James Fenimore Cooper', 'Barnes & Noble', 2.95, 5.35, 5),
(9781607103103, 'War and Peace', 'Leo Tolstoy', ' Advantage', 10, 17.96, 5),
(9781613820001, 'The Call of the Wild', 'Jack London', 'Simon & Brown', 3.25, 6.5, 1),
(9788483235539, 'Robinson Crusoe', 'Daniel Defoe', 'Cambridge University Press', 5.14, 11.52, 0);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE IF NOT EXISTS `transactions` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `DATE` date NOT NULL,
  `TYPE` int(2) NOT NULL,
  `PRICE` float NOT NULL,
  `BOOKID` bigint(24) NOT NULL,
  `QTY` int(10) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=41 ;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`ID`, `DATE`, `TYPE`, `PRICE`, `BOOKID`, `QTY`) VALUES
(1, '2012-01-01', 1, 17.99, 439023483, 1),
(2, '2012-01-01', 1, 7.99, 9780590353427, 14),
(3, '2012-01-01', 1, 10.99, 9780316015844, 5),
(4, '2012-01-02', 1, 13.98, 9780143039433, 3),
(5, '2012-01-03', 2, 13.98, 9780143039433, 1),
(6, '2012-01-04', 1, 10.98, 9780439785969, 18),
(7, '2012-01-05', 1, 7.99, 9780590353427, 2),
(8, '2012-01-06', 1, 8.98, 9780439064873, 5),
(9, '2012-01-07', 1, 8.98, 9780439136365, 14),
(10, '2012-01-07', 1, 10.98, 9780439139601, 8),
(11, '2012-01-07', 1, 10.98, 9780439358064, 12),
(12, '2012-01-09', 1, 10.98, 9780439785969, 9),
(13, '2012-01-13', 1, 10.98, 9780545139700, 4),
(14, '2012-01-13', 1, 10.99, 9780316024969, 23),
(15, '2012-01-14', 1, 12.99, 9780316027656, 27),
(16, '2012-01-14', 1, 14.99, 9780316067935, 29),
(17, '2012-01-16', 1, 5.99, 9780553210798, 1),
(18, '2012-01-16', 1, 6.99, 9780449213940, 2),
(19, '2012-01-17', 1, 8.95, 9781593080815, 3),
(20, '2012-01-18', 1, 6.99, 9781416500186, 2),
(21, '2012-01-18', 1, 11.95, 9781400092727, 1),
(22, '2012-01-19', 1, 10.98, 9780684801223, 1),
(23, '2012-01-20', 1, 13.36, 9780393976045, 14),
(24, '2012-01-20', 1, 17.96, 9781607103103, 3),
(25, '2012-01-21', 1, 13.94, 9780141040356, 13),
(26, '2012-01-23', 1, 5.95, 9781402726620, 5),
(27, '2012-01-24', 2, 13.94, 9780141040356, 4),
(28, '2012-01-24', 1, 15, 9780393964585, 2),
(29, '2012-01-25', 1, 12.95, 9781402736957, 11),
(30, '2012-01-25', 1, 9.45, 9781402714566, 8),
(31, '2012-02-26', 1, 8.95, 9781402714573, 6),
(32, '2012-02-27', 1, 19.25, 764583328, 1),
(33, '2012-01-27', 1, 10.99, 9780316024969, 14),
(34, '2012-01-27', 1, 12.99, 9780316027656, 12),
(35, '2012-01-27', 1, 10.98, 9780439358064, 9),
(36, '2012-01-28', 1, 10.98, 9780439785969, 4),
(37, '2012-01-30', 1, 10.98, 9780545139700, 8),
(38, '2012-01-31', 1, 10.99, 9780316024969, 19),
(39, '2012-02-01', 1, 14.99, 9780316067935, 21),
(40, '2012-02-02', 1, 13.36, 9780393976045, 18);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
