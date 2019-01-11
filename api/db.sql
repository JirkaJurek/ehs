-- Adminer 4.6.3 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `config`;
CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prettyName` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `data` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `path` text,
  `absolutePath` text,
  `size` int(11) DEFAULT NULL,
  `mimetype` varchar(255) DEFAULT NULL,
  `createAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `file` (`id`, `name`, `path`, `absolutePath`, `size`, `mimetype`, `createAt`) VALUES
(1,	'IMG_20181019_122126.jpg',	'/files/ps0o2d4vq.jpeg',	'/home/miki.rosi/nodejsApi/web/public/files/ps0o2d4vq.jpeg',	NULL,	'image/jpeg',	'2018-12-11 19:47:41'),
(2,	'Stojan stromeček.pdf',	'/files/83jc0b69h.pdf',	'/home/miki.rosi/nodejsApi/web/public/files/83jc0b69h.pdf',	NULL,	'application/pdf',	'2018-12-11 19:48:42');

DROP TABLE IF EXISTS `move_stock`;
CREATE TABLE `move_stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinyint(4) DEFAULT NULL,
  `exporter` tinyint(4) DEFAULT NULL COMMENT 'Jestli jde o výdejku nebo přijímku',
  `items` longtext,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(100) NOT NULL,
  `dateOfEntry` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `submitterId` int(11) NOT NULL,
  `submitter` json NOT NULL,
  `resolverId` int(11) NOT NULL,
  `resolver` json NOT NULL,
  `type` varchar(255) NOT NULL,
  `name` text CHARACTER SET utf8 NOT NULL,
  `presumedEnd` datetime NOT NULL,
  `doneAt` datetime DEFAULT NULL,
  `taskFulfillment` json DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `submitterId` (`submitterId`),
  KEY `resolverId` (`resolverId`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`submitterId`) REFERENCES `user` (`id`),
  CONSTRAINT `task_ibfk_2` FOREIGN KEY (`resolverId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `task_fulfillment`;
CREATE TABLE `task_fulfillment` (
  `taskId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `user` json NOT NULL,
  `description` text,
  `done` tinyint(4) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `taskId` (`taskId`),
  KEY `userId` (`userId`),
  CONSTRAINT `task_fulfillment_ibfk_1` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`),
  CONSTRAINT `task_fulfillment_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `tool`;
CREATE TABLE `tool` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier` longtext,
  `categories` longtext,
  `name` varchar(255) DEFAULT NULL,
  `shortName` varchar(255) DEFAULT NULL,
  `revisionCard` varchar(255) DEFAULT NULL,
  `startWork` date DEFAULT NULL,
  `seriesNumber` varchar(255) DEFAULT NULL,
  `machineNumber` varchar(255) DEFAULT NULL,
  `inventoryNumber` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `yearOfManufacture` year(4) DEFAULT NULL,
  `comment` text,
  `employee` longtext COMMENT 'bude se moct odstranit, používá se items',
  `revisions` longtext,
  `revisionTypes` longtext,
  `repair` longtext,
  `price` mediumint(9) DEFAULT NULL,
  `check` tinyint(4) NOT NULL DEFAULT '0',
  `filter1` varchar(255) DEFAULT NULL,
  `filter2` varchar(255) DEFAULT NULL,
  `filter3` varchar(255) DEFAULT NULL,
  `files` longtext,
  `guaranteeInto` date DEFAULT NULL,
  `supplierId` int(11) DEFAULT NULL,
  `employeeId` int(11) DEFAULT NULL COMMENT 'bude se moct odstranit, používá se items',
  `inStock` tinyint(4) DEFAULT NULL COMMENT 'bude se moct odstranit, používá se items',
  `deletedAt` datetime DEFAULT NULL,
  `items` longtext COMMENT 'třeba kladivo má 20 lidí, tak je to zahrnuto zde',
  `itemsHistory` longtext COMMENT 'historie výdaju a příjmu',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `tool_categories`;
CREATE TABLE `tool_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parentId` (`parentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `tool_categories` (`id`, `name`, `parentId`) VALUES
(1,	'Velké stroje',	NULL),
(2,	'Elektrické nářadí',	NULL),
(3,	'Odsávání, vysavače',	NULL),
(4,	'Jeřáby, zdvihací zařízení, vozíky',	NULL),
(5,	'Prodlužovací kabely',	NULL),
(6,	'Topení, plyn',	NULL),
(7,	'Kompresory, vývěvy, tlak. nádoby',	NULL),
(8,	'Hasící zařízení',	NULL),
(9,	'Budova, auta, EZS',	NULL),
(10,	'základní kategorie',	NULL),
(11,	'základní kategorie 2',	NULL),
(12,	'Základní kategorie 3',	NULL),
(13,	'Počítače, servery, HW',	NULL),
(14,	'CNC nástroje',	NULL),
(15,	'Regály',	NULL),
(16,	'Měřidla',	NULL),
(17,	'Vázací prostředky',	NULL);

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


DROP TABLE IF EXISTS `tool_item`;
CREATE TABLE `tool_item` (
  `id_tool` int(11) NOT NULL,
  `inStock` mediumint(9) DEFAULT NULL COMMENT 'počet kusu skladem',
  `warehouseId` int(11) NOT NULL,
  `warehouse` longtext,
  `count` mediumint(9) DEFAULT NULL COMMENT 'celkový počet',
  `inService` mediumint(9) DEFAULT NULL COMMENT 'počet kusu v servisu, asi smazat',
  `place` varchar(255) DEFAULT NULL COMMENT 'také asi smazat',
  PRIMARY KEY (`id_tool`,`warehouseId`),
  KEY `id_tool` (`id_tool`),
  CONSTRAINT `tool_item_ibfk_1` FOREIGN KEY (`id_tool`) REFERENCES `tool` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `tool_revision`;
CREATE TABLE `tool_revision` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tool` int(11) NOT NULL,
  `id_tool_revision_types` int(11) DEFAULT NULL,
  `revisionType` longtext,
  `date` date DEFAULT NULL,
  `nextRevision` date DEFAULT NULL,
  `description` text,
  `who` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_tool` (`id_tool`),
  KEY `id_tool_revision_types` (`id_tool_revision_types`),
  CONSTRAINT `tool_revision_ibfk_1` FOREIGN KEY (`id_tool`) REFERENCES `tool` (`id`),
  CONSTRAINT `tool_revision_ibfk_2` FOREIGN KEY (`id_tool_revision_types`) REFERENCES `tool_revision_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `tool_revision_type`;
CREATE TABLE `tool_revision_type` (
  `id_tool` int(11) NOT NULL,
  `id_tool_revision_types` int(11) NOT NULL,
  PRIMARY KEY (`id_tool`,`id_tool_revision_types`),
  KEY `id_tool_revision_types` (`id_tool_revision_types`),
  CONSTRAINT `tool_revision_type_ibfk_1` FOREIGN KEY (`id_tool`) REFERENCES `tool` (`id`),
  CONSTRAINT `tool_revision_type_ibfk_2` FOREIGN KEY (`id_tool_revision_types`) REFERENCES `tool_revision_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `tool_revision_types`;
CREATE TABLE `tool_revision_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `revisionInterval` varchar(100) DEFAULT NULL,
  `description` text,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `tool_revision_types` (`id`, `name`, `revisionInterval`, `description`, `deletedAt`) VALUES
(1,	'Revize Elektro - dvouletá',	'{\"value\":\"24 month\",\"text\":\"24 měsíců\"}',	'Velké stroje, Budova, Jeřáby, Vacuum frezer,',	NULL),
(2,	'Běžná inspekce jeřáby - čtvrtletní',	'{\"value\":\"3 month\",\"text\":\"3 měsíce\"}',	'GIGA jeřáby, Fobus kladkostroj',	NULL),
(3,	'test2',	'{\"value\":\"1 month\",\"text\":\"Měsíční\"}',	'ahoj',	'2018-10-30 06:24:00'),
(4,	'Revize Elektro - roční ',	'{\"value\":\"12 month\",\"text\":\"12 měsíců\"}',	'Ruční elektrické nářadí, počítače + servery + HW, Elektrický paletový vozík, EZS + EPS',	NULL),
(5,	'test',	'{\"value\":\"1 month\",\"text\":\"Měsíční\"}',	NULL,	'2018-10-30 06:24:01'),
(6,	'tester',	'{\"value\":\"6 month\",\"text\":\"Půlroční\"}',	'ahoj',	'2018-10-30 00:00:00'),
(7,	'Periodická revize jeřáby - roční',	'{\"value\":\"12 month\",\"text\":\"12 měsíců\"}',	'GIGA jeřáby',	NULL),
(8,	'Revize stavu jeřáby - tříletá',	'{\"value\":\"36 month\",\"text\":\"36 měsíců\"}',	'GIGA jeřáby',	NULL),
(9,	'Revizní zkouška stavu jeřáby - pětiletá',	'{\"value\":\"60 month\",\"text\":\"60 měsíců\"}',	'GIGA jeřáby',	NULL),
(10,	'Revizní zkouška tlakové nádoby - roční',	'{\"value\":\"12 month\",\"text\":\"12 měsíců\"}',	'Samostatné Tlakové nádoby,  Tlaková nádoba kompresoru',	NULL),
(11,	'Revize zásobování požární vodou - roční',	'{\"value\":\"12 month\",\"text\":\"12 měsíců\"}',	'Požární hydranty',	NULL),
(12,	'Revizní zkouška tlaková hasící přístroje - roční',	'{\"value\":\"12 month\",\"text\":\"12 měsíců\"}',	'Hasící přístroje',	NULL),
(13,	'Technická kontrola vozidla - dvouletá',	'{\"value\":\"24 month\",\"text\":\"24 měsíců\"}',	'Auta po 4 letech od koupě',	NULL),
(14,	'Technická kontrola vozidla - čtyřletá',	'{\"value\":\"48 month\",\"text\":\"48 měsíců\"}',	'Nově koupená vozidla do 4 let stáří',	NULL);

DROP TABLE IF EXISTS `tool_supplier`;
CREATE TABLE `tool_supplier` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `degree` varchar(100) NOT NULL DEFAULT '',
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `personalNumber` varchar(255) DEFAULT NULL,
  `description` text,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `user` (`id`, `degree`, `firstName`, `lastName`, `personalNumber`, `description`, `deletedAt`, `createdAt`) VALUES
(1,	'',	'Lenka ',	'Rosecká',	'040',	'rosecka',	NULL,	'2019-01-08 20:08:55'),
(2,	'Bc.',	'Lenka ',	'Rosecká ml.',	'063',	'lrosecka',	NULL,	'2019-01-08 20:08:55'),
(3,	'',	'Petr ',	'Bořil',	'001',	'boril',	NULL,	'2019-01-08 20:08:55'),
(4,	'',	'Martin ',	'Bořil',	'054',	'mboril',	NULL,	'2019-01-08 20:08:55'),
(5,	'',	'Richard ',	'Joura',	'057',	'joura',	NULL,	'2019-01-08 20:08:55'),
(6,	'',	'Jaromír ',	'Řezník',	'058',	'reznik',	NULL,	'2019-01-08 20:08:55'),
(7,	'',	'Aleš ',	'Zadina',	'061',	'zadina',	NULL,	'2019-01-08 20:08:55'),
(8,	'',	'Jaroslav',	'Rosecký',	'004',	'',	NULL,	'2019-01-08 20:08:55'),
(9,	'',	'Jiří ',	'Havlík',	'005',	'',	NULL,	'2019-01-08 20:08:55'),
(10,	'',	'Luboš ',	'Kudrna',	'006',	'kudrna',	NULL,	'2019-01-08 20:08:55'),
(11,	'',	'Josef ',	'Muller',	'007',	'',	NULL,	'2019-01-08 20:08:55'),
(12,	'',	'Ludvík ',	'Karásek',	'008',	'karasek',	NULL,	'2019-01-08 20:08:55'),
(13,	'',	'Jan ',	'Gregor',	'015',	'',	NULL,	'2019-01-08 20:08:55'),
(14,	'',	'Michal ',	'Kružík',	'018',	'kruzik',	NULL,	'2019-01-08 20:08:55'),
(15,	'',	'Pavel  ',	'Weinhofer',	'019',	'weinhofer',	NULL,	'2019-01-08 20:08:55'),
(16,	'Ing.',	'Pavel ',	'Havlíček',	'024',	'havlicek',	NULL,	'2019-01-08 20:08:55'),
(17,	'',	'Michal ',	'Kolouch',	'030',	'kolouch',	NULL,	'2019-01-08 20:08:55'),
(18,	'',	'Petr ',	'Kozel',	'038',	NULL,	NULL,	'2019-01-08 20:08:55'),
(19,	'',	'Vladimír ',	'Brož',	'039',	NULL,	NULL,	'2019-01-08 20:08:55'),
(20,	'',	'Josef',	' Bodlák',	'044',	NULL,	NULL,	'2019-01-08 20:08:55'),
(21,	'',	'Tomáš',	'Vytlačil',	'051',	'vytlacil',	NULL,	'2019-01-08 20:08:55'),
(22,	'',	'Hana ',	'Žáková',	'056',	NULL,	NULL,	'2019-01-08 20:08:55'),
(23,	'',	'Martin ',	'Klusáček',	'059',	'klusacek',	NULL,	'2019-01-08 20:08:55'),
(24,	'',	'Tomáš ',	'Hladík',	'064',	NULL,	NULL,	'2019-01-08 20:08:55'),
(25,	'',	'František ',	'Mach',	'065',	NULL,	NULL,	'2019-01-08 20:08:55'),
(26,	'',	'Jiří ',	'Havelka',	'066',	'havelka',	NULL,	'2019-01-08 20:08:55'),
(27,	'',	'Vojtěch ',	'Rolínek',	'067',	'rolinek',	NULL,	'2019-01-08 20:08:55'),
(28,	'',	'Jan ',	'Kanalas',	'069',	'kanalas',	NULL,	'2019-01-08 20:08:55'),
(29,	'',	'Martin ',	'Zitka',	'070',	NULL,	NULL,	'2019-01-08 20:08:55'),
(30,	'',	'',	NULL,	NULL,	NULL,	'2018-12-14 14:09:17',	'2019-01-08 20:08:55'),
(31,	' ',	'Jan',	'Žák',	'071',	'zak',	NULL,	'2019-01-08 20:08:55'),
(32,	'',	'test',	'michal',	'sadfd',	'fdas',	'2019-01-08 20:13:39',	'2019-01-08 20:13:17');

DROP TABLE IF EXISTS `user_permission`;
CREATE TABLE `user_permission` (
  `userId` int(11) NOT NULL,
  `userPermissionId` int(11) NOT NULL,
  PRIMARY KEY (`userId`,`userPermissionId`),
  KEY `userPermissionId` (`userPermissionId`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_permission_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `user_permission_ibfk_2` FOREIGN KEY (`userPermissionId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `user_permissions`;
CREATE TABLE `user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `warehouse`;
CREATE TABLE `warehouse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(50) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `accountableEmployee` longtext,
  `accountableEmployeeId` int(11) DEFAULT NULL,
  `description` text,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 2019-01-08 20:16:08
