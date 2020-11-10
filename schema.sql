CREATE DATABASE IF NOT EXISTS `node_app`;
USE `node_app`;

CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(50) NOT NULL ,
  `fullname` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY(username)
);

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL,
  `productName` varchar(50) NOT NULL,
  `productCategory` varchar(255) NOT NULL,
  `price` int(11) NOT NULL
);

INSERT INTO `products` (`id`, `productName`, `productCategory`, `price`) VALUES 
(1, 'Santoor Soap', 'Soap', '30'),
(2, 'Cintol Soap', 'Soap', '50'),
(3, 'Dove Shampoo', 'Shampoo', '60');

