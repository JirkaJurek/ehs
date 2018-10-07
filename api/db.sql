-- Adminer 4.6.3 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `tool`;
CREATE TABLE `tool` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier` longtext DEFAULT NULL,
  `categories` longtext DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `revisionCard` varchar(255) DEFAULT NULL,
  `startWork` date DEFAULT NULL,
  `seriesNumber` varchar(255) DEFAULT NULL,
  `internal` varchar(255) DEFAULT NULL,
  `external` varchar(255) DEFAULT NULL,
  `revisionInterval` longtext DEFAULT NULL,
  `nextRevision` date DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `employee` longtext DEFAULT NULL,
  `revisions` longtext DEFAULT NULL,
  `repair` longtext DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `filter1` varchar(255) DEFAULT NULL,
  `filter2` varchar(255) DEFAULT NULL,
  `filter3` varchar(255) DEFAULT NULL,
  `files` longtext DEFAULT NULL,
  `guaranteeInto` date DEFAULT NULL,
  `supplierId` int(11) DEFAULT NULL,
  `employeeId` int(11) DEFAULT NULL,
  `inStock` tinyint(4) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `tool_categories`;
CREATE TABLE `tool_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parentId` (`parentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `tool_category`;
CREATE TABLE `tool_category` (
  `id_tool` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  PRIMARY KEY (`id_tool`,`id_category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `tool_file`;
CREATE TABLE `tool_file` (
  `id` int(11) NOT NULL,
  `path` text NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `tool_revision`;
CREATE TABLE `tool_revision` (
  `id_tool` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `who` varchar(255) DEFAULT NULL,
  KEY `id_tool` (`id_tool`),
  CONSTRAINT `tool_revision_ibfk_1` FOREIGN KEY (`id_tool`) REFERENCES `tool` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `tool_supplier`;
CREATE TABLE `tool_supplier` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 2018-10-04 16:52:50
