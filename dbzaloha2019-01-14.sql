-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: localhost    Database: intranet
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prettyName` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `data` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `path` text,
  `absolutePath` text,
  `size` int(11) DEFAULT NULL,
  `mimetype` varchar(255) DEFAULT NULL,
  `createAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (1,'IMG_20181019_122126.jpg','/files/ps0o2d4vq.jpeg','/home/miki.rosi/nodejsApi/web/public/files/ps0o2d4vq.jpeg',NULL,'image/jpeg','2018-12-11 19:47:41'),(2,'Stojan stromeček.pdf','/files/83jc0b69h.pdf','/home/miki.rosi/nodejsApi/web/public/files/83jc0b69h.pdf',NULL,'application/pdf','2018-12-11 19:48:42');
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `move_stock`
--

DROP TABLE IF EXISTS `move_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `move_stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinyint(4) DEFAULT NULL,
  `exporter` tinyint(4) DEFAULT NULL COMMENT 'Jestli jde o výdejku nebo přijímku',
  `items` longtext,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `move_stock`
--

LOCK TABLES `move_stock` WRITE;
/*!40000 ALTER TABLE `move_stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `move_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,'19-0001','2019-01-09 12:54:39',3,'{\"id\": \"3\", \"degree\": \"\", \"lastName\": \"Bořil\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Petr \", \"description\": \"boril\", \"personalNumber\": \"001\"}',5,'{\"id\": \"5\", \"degree\": \"\", \"lastName\": \"Joura\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Richard \", \"description\": \"joura\", \"personalNumber\": \"057\"}','Výroba','Školení PO pro zaměstnance - 5 ti minutovka','2019-01-18 00:00:00',NULL,'[{\"done\": \"30\", \"user\": \"{\\\"id\\\": \\\"5\\\", \\\"degree\\\": \\\"\\\", \\\"lastName\\\": \\\"Joura\\\", \\\"createdAt\\\": \\\"2019-01-08 20:08:55\\\", \\\"deletedAt\\\": null, \\\"firstName\\\": \\\"Richard \\\", \\\"description\\\": \\\"joura\\\", \\\"personalNumber\\\": \\\"057\\\"}\", \"taskId\": \"1\", \"userId\": \"5\", \"createdAt\": \"2019-01-09 12:56:05\", \"description\": \"Připraveny podklady pro školení\"}]',NULL),(2,'19-0002','2019-01-10 11:22:02',12,'{\"id\": \"12\", \"degree\": \"\", \"lastName\": \"Karásek\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Ludvík \", \"description\": \"karasek\", \"personalNumber\": \"008\"}',5,'{\"id\": \"5\", \"degree\": \"\", \"lastName\": \"Joura\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Richard \", \"description\": \"joura\", \"personalNumber\": \"057\"}','Výroba','Objednat spárovku olše 2000x1250x52 mm - 7,5m3 ','2019-01-11 00:00:00','2019-01-10 11:25:04','[{\"done\": \"100\", \"user\": \"{\\\"id\\\": \\\"5\\\", \\\"degree\\\": \\\"\\\", \\\"lastName\\\": \\\"Joura\\\", \\\"createdAt\\\": \\\"2019-01-08 20:08:55\\\", \\\"deletedAt\\\": null, \\\"firstName\\\": \\\"Richard \\\", \\\"description\\\": \\\"joura\\\", \\\"personalNumber\\\": \\\"057\\\"}\", \"taskId\": \"2\", \"userId\": \"5\", \"createdAt\": \"2019-01-10 11:25:04\", \"description\": \"Spárovka je skladem, poslána objednávka na De-wood 10.01.2019. Doprava zadána u Kopaz p. Špaček s realizací od zítra do konce příštího týdne jakmile bude vytížení.\"}]',NULL),(3,'19-0003','2019-01-10 11:27:00',3,'{\"id\": \"3\", \"degree\": \"\", \"lastName\": \"Bořil\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Petr \", \"description\": \"boril\", \"personalNumber\": \"001\"}',5,'{\"id\": \"5\", \"degree\": \"\", \"lastName\": \"Joura\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Richard \", \"description\": \"joura\", \"personalNumber\": \"057\"}','Správní','Objednání a provedení revize tlakových nádob + přeškolení obsluhy pro pravidelnou kontrolu tlakových nádob','2019-01-23 00:00:00',NULL,'[{\"done\": \"30\", \"user\": \"{\\\"id\\\": \\\"5\\\", \\\"degree\\\": \\\"\\\", \\\"lastName\\\": \\\"Joura\\\", \\\"createdAt\\\": \\\"2019-01-08 20:08:55\\\", \\\"deletedAt\\\": null, \\\"firstName\\\": \\\"Richard \\\", \\\"description\\\": \\\"joura\\\", \\\"personalNumber\\\": \\\"057\\\"}\", \"taskId\": \"3\", \"userId\": \"5\", \"createdAt\": \"2019-01-10 11:30:59\", \"description\": \"Domluven termín provedení revize tlakových nádob na pondělí 14.01.2019\\nTermín proškolení obsluhy je předběžně domluvený na 22.01.2019 kolem 12 hodiny. \"}, {\"done\": \"0\", \"user\": \"{\\\"id\\\": \\\"1\\\", \\\"degree\\\": \\\"\\\", \\\"lastName\\\": \\\"Rosecká\\\", \\\"createdAt\\\": \\\"2019-01-08 20:08:55\\\", \\\"deletedAt\\\": null, \\\"firstName\\\": \\\"Lenka \\\", \\\"description\\\": \\\"rosecka\\\", \\\"personalNumber\\\": \\\"040\\\"}\", \"taskId\": \"3\", \"userId\": \"1\", \"createdAt\": \"2019-01-10 11:28:15\", \"description\": \"Změna názvu z \\\"Objednání a provedení revize tlakových nádob\\\" na \\\"Objednání a provedení revize tlakových nádob + přeškolení obsluhy pro pravidelnou kontrolu tlakových nádob\\\".\"}]',NULL),(4,'19-0004','2019-01-10 12:00:41',10,'{\"id\": \"10\", \"degree\": \"\", \"lastName\": \"Kudrna\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Luboš \", \"description\": \"kudrna\", \"personalNumber\": \"006\"}',5,'{\"id\": \"5\", \"degree\": \"\", \"lastName\": \"Joura\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Richard \", \"description\": \"joura\", \"personalNumber\": \"057\"}','Servis','Objednat opravu u pana Zikmunda následujících položek:\n- Vysavač Makita - asi vadný vypínač\n- Vrtačka Makita - nefunguje - prohlédnout příčinu\nUmístění obou nářadí je v prostoru vedle provizorní šatny u sloupu s popisy odpadů. (info L. Karásek) ','2019-01-31 00:00:00',NULL,'[]',NULL),(5,'19-0005','2019-01-11 07:44:21',10,'{\"id\": \"10\", \"degree\": \"\", \"lastName\": \"Kudrna\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Luboš \", \"description\": \"kudrna\", \"personalNumber\": \"006\"}',5,'{\"id\": \"5\", \"degree\": \"\", \"lastName\": \"Joura\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Richard \", \"description\": \"joura\", \"personalNumber\": \"057\"}','Servis','Nesvítí zářivkové svítidlo v prostoru pro skladování odpadu vedle provizorní šatny.\nProjít ostatní svítidla co nesvítí.\nDámské záchody světlo na čidlo vyřadit čidlo, ovládání pouze na klapku.\nNahlásit panu Zikmundovi.','2019-01-25 00:00:00',NULL,'[]',NULL),(6,'19-0006','2019-01-11 08:12:30',3,'{\"id\": \"3\", \"degree\": \"\", \"lastName\": \"Bořil\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Petr \", \"description\": \"boril\", \"personalNumber\": \"001\"}',5,'{\"id\": \"5\", \"degree\": \"\", \"lastName\": \"Joura\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Richard \", \"description\": \"joura\", \"personalNumber\": \"057\"}','Správní','LSmont p.Skryja - připravit a doložit VAS kopii Zápisu o kontrole provedených obsypů kanalizační přípojky , odstranění závad.  ','2019-01-31 00:00:00',NULL,'[{\"done\": \"50\", \"user\": \"{\\\"id\\\": \\\"5\\\", \\\"degree\\\": \\\"\\\", \\\"lastName\\\": \\\"Joura\\\", \\\"createdAt\\\": \\\"2019-01-08 20:08:55\\\", \\\"deletedAt\\\": null, \\\"firstName\\\": \\\"Richard \\\", \\\"description\\\": \\\"joura\\\", \\\"personalNumber\\\": \\\"057\\\"}\", \"taskId\": \"6\", \"userId\": \"5\", \"createdAt\": \"2019-01-11 08:15:42\", \"description\": \"Po konzultaci s p. Habánem byla odeslána e-mailem 11.01.2019 žádost o doložení zápisu p. Skryjovi LS mont.\"}]',NULL),(7,'19-0007','2019-01-11 10:19:17',5,'{\"id\": \"5\", \"degree\": \"\", \"lastName\": \"Joura\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Richard \", \"description\": \"joura\", \"personalNumber\": \"057\"}',5,'{\"id\": \"5\", \"degree\": \"\", \"lastName\": \"Joura\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Richard \", \"description\": \"joura\", \"personalNumber\": \"057\"}','Správní','Poslat Respectu p. Pavlíčkové podklady pro škodní událost Taurus požadované z e-mailu 17.12.2018.','2019-01-18 00:00:00',NULL,'[{\"done\": \"90\", \"user\": \"{\\\"id\\\": \\\"5\\\", \\\"degree\\\": \\\"\\\", \\\"lastName\\\": \\\"Joura\\\", \\\"createdAt\\\": \\\"2019-01-08 20:08:55\\\", \\\"deletedAt\\\": null, \\\"firstName\\\": \\\"Richard \\\", \\\"description\\\": \\\"joura\\\", \\\"personalNumber\\\": \\\"057\\\"}\", \"taskId\": \"7\", \"userId\": \"5\", \"createdAt\": \"2019-01-11 10:20:52\", \"description\": \"Odeslány e-mailem 11.1.2019 požadované podklady na paní Pavlíčkovou.\"}]',NULL),(8,'19-0008','2019-01-11 10:22:09',5,'{\"id\": \"5\", \"degree\": \"\", \"lastName\": \"Joura\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Richard \", \"description\": \"joura\", \"personalNumber\": \"057\"}',5,'{\"id\": \"5\", \"degree\": \"\", \"lastName\": \"Joura\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Richard \", \"description\": \"joura\", \"personalNumber\": \"057\"}','Správní','Poslat Respectu p. Pavlíčkové podklady pro škodní událost Vytopená kancelář požadované z e-mailu 17.12.2018.','2019-01-18 00:00:00',NULL,'[]',NULL);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_fulfillment`
--

DROP TABLE IF EXISTS `task_fulfillment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_fulfillment`
--

LOCK TABLES `task_fulfillment` WRITE;
/*!40000 ALTER TABLE `task_fulfillment` DISABLE KEYS */;
INSERT INTO `task_fulfillment` VALUES (1,5,'{\"id\": \"5\", \"degree\": \"\", \"lastName\": \"Joura\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Richard \", \"description\": \"joura\", \"personalNumber\": \"057\"}','Připraveny podklady pro školení',30,'2019-01-09 12:56:05'),(2,5,'{\"id\": \"5\", \"degree\": \"\", \"lastName\": \"Joura\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Richard \", \"description\": \"joura\", \"personalNumber\": \"057\"}','Spárovka je skladem, poslána objednávka na De-wood 10.01.2019. Doprava zadána u Kopaz p. Špaček s realizací od zítra do konce příštího týdne jakmile bude vytížení.',100,'2019-01-10 11:25:04'),(3,1,'{\"id\": \"1\", \"degree\": \"\", \"lastName\": \"Rosecká\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Lenka \", \"description\": \"rosecka\", \"personalNumber\": \"040\"}','Změna názvu z \"Objednání a provedení revize tlakových nádob\" na \"Objednání a provedení revize tlakových nádob + přeškolení obsluhy pro pravidelnou kontrolu tlakových nádob\".',0,'2019-01-10 11:28:15'),(3,5,'{\"id\": \"5\", \"degree\": \"\", \"lastName\": \"Joura\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Richard \", \"description\": \"joura\", \"personalNumber\": \"057\"}','Domluven termín provedení revize tlakových nádob na pondělí 14.01.2019\nTermín proškolení obsluhy je předběžně domluvený na 22.01.2019 kolem 12 hodiny. ',30,'2019-01-10 11:30:59'),(6,5,'{\"id\": \"5\", \"degree\": \"\", \"lastName\": \"Joura\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Richard \", \"description\": \"joura\", \"personalNumber\": \"057\"}','Po konzultaci s p. Habánem byla odeslána e-mailem 11.01.2019 žádost o doložení zápisu p. Skryjovi LS mont.',50,'2019-01-11 08:15:42'),(7,5,'{\"id\": \"5\", \"degree\": \"\", \"lastName\": \"Joura\", \"createdAt\": \"2019-01-08 20:08:55\", \"deletedAt\": null, \"firstName\": \"Richard \", \"description\": \"joura\", \"personalNumber\": \"057\"}','Odeslány e-mailem 11.1.2019 požadované podklady na paní Pavlíčkovou.',90,'2019-01-11 10:20:52');
/*!40000 ALTER TABLE `task_fulfillment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tool`
--

DROP TABLE IF EXISTS `tool`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tool`
--

LOCK TABLES `tool` WRITE;
/*!40000 ALTER TABLE `tool` DISABLE KEYS */;
/*!40000 ALTER TABLE `tool` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tool_categories`
--

DROP TABLE IF EXISTS `tool_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tool_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parentId` (`parentId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tool_categories`
--

LOCK TABLES `tool_categories` WRITE;
/*!40000 ALTER TABLE `tool_categories` DISABLE KEYS */;
INSERT INTO `tool_categories` VALUES (1,'Velké stroje',NULL),(2,'Elektrické nářadí',NULL),(3,'Odsávání, vysavače',NULL),(4,'Jeřáby, zdvihací zařízení, vozíky',NULL),(5,'Prodlužovací kabely',NULL),(6,'Topení, plyn',NULL),(7,'Kompresory, vývěvy, tlak. nádoby',NULL),(8,'Hasící zařízení',NULL),(9,'Budova, auta, EZS',NULL),(10,'základní kategorie',NULL),(11,'základní kategorie 2',NULL),(12,'Základní kategorie 3',NULL),(13,'Počítače, servery, HW',NULL),(14,'CNC nástroje',NULL),(15,'Regály',NULL),(16,'Měřidla',NULL),(17,'Vázací prostředky',NULL);
/*!40000 ALTER TABLE `tool_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tool_category`
--

DROP TABLE IF EXISTS `tool_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tool_category` (
  `id_tool` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  PRIMARY KEY (`id_tool`,`id_category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tool_category`
--

LOCK TABLES `tool_category` WRITE;
/*!40000 ALTER TABLE `tool_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `tool_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tool_file`
--

DROP TABLE IF EXISTS `tool_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tool_file` (
  `id` int(11) NOT NULL,
  `path` text NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tool_file`
--

LOCK TABLES `tool_file` WRITE;
/*!40000 ALTER TABLE `tool_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `tool_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tool_item`
--

DROP TABLE IF EXISTS `tool_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tool_item`
--

LOCK TABLES `tool_item` WRITE;
/*!40000 ALTER TABLE `tool_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `tool_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tool_revision`
--

DROP TABLE IF EXISTS `tool_revision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tool_revision`
--

LOCK TABLES `tool_revision` WRITE;
/*!40000 ALTER TABLE `tool_revision` DISABLE KEYS */;
/*!40000 ALTER TABLE `tool_revision` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tool_revision_type`
--

DROP TABLE IF EXISTS `tool_revision_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tool_revision_type` (
  `id_tool` int(11) NOT NULL,
  `id_tool_revision_types` int(11) NOT NULL,
  PRIMARY KEY (`id_tool`,`id_tool_revision_types`),
  KEY `id_tool_revision_types` (`id_tool_revision_types`),
  CONSTRAINT `tool_revision_type_ibfk_1` FOREIGN KEY (`id_tool`) REFERENCES `tool` (`id`),
  CONSTRAINT `tool_revision_type_ibfk_2` FOREIGN KEY (`id_tool_revision_types`) REFERENCES `tool_revision_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tool_revision_type`
--

LOCK TABLES `tool_revision_type` WRITE;
/*!40000 ALTER TABLE `tool_revision_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `tool_revision_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tool_revision_types`
--

DROP TABLE IF EXISTS `tool_revision_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tool_revision_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `revisionInterval` varchar(100) DEFAULT NULL,
  `description` text,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tool_revision_types`
--

LOCK TABLES `tool_revision_types` WRITE;
/*!40000 ALTER TABLE `tool_revision_types` DISABLE KEYS */;
INSERT INTO `tool_revision_types` VALUES (1,'Revize Elektro - dvouletá','{\"value\":\"24 month\",\"text\":\"24 měsíců\"}','Velké stroje, Budova, Jeřáby, Vacuum frezer,',NULL),(2,'Běžná inspekce jeřáby - čtvrtletní','{\"value\":\"3 month\",\"text\":\"3 měsíce\"}','GIGA jeřáby, Fobus kladkostroj',NULL),(3,'test2','{\"value\":\"1 month\",\"text\":\"Měsíční\"}','ahoj','2018-10-30 06:24:00'),(4,'Revize Elektro - roční ','{\"value\":\"12 month\",\"text\":\"12 měsíců\"}','Ruční elektrické nářadí, počítače + servery + HW, Elektrický paletový vozík, EZS + EPS',NULL),(5,'test','{\"value\":\"1 month\",\"text\":\"Měsíční\"}',NULL,'2018-10-30 06:24:01'),(6,'tester','{\"value\":\"6 month\",\"text\":\"Půlroční\"}','ahoj','2018-10-30 00:00:00'),(7,'Periodická revize jeřáby - roční','{\"value\":\"12 month\",\"text\":\"12 měsíců\"}','GIGA jeřáby',NULL),(8,'Revize stavu jeřáby - tříletá','{\"value\":\"36 month\",\"text\":\"36 měsíců\"}','GIGA jeřáby',NULL),(9,'Revizní zkouška stavu jeřáby - pětiletá','{\"value\":\"60 month\",\"text\":\"60 měsíců\"}','GIGA jeřáby',NULL),(10,'Revizní zkouška tlakové nádoby - roční','{\"value\":\"12 month\",\"text\":\"12 měsíců\"}','Samostatné Tlakové nádoby,  Tlaková nádoba kompresoru',NULL),(11,'Revize zásobování požární vodou - roční','{\"value\":\"12 month\",\"text\":\"12 měsíců\"}','Požární hydranty',NULL),(12,'Revizní zkouška tlaková hasící přístroje - roční','{\"value\":\"12 month\",\"text\":\"12 měsíců\"}','Hasící přístroje',NULL),(13,'Technická kontrola vozidla - dvouletá','{\"value\":\"24 month\",\"text\":\"24 měsíců\"}','Auta po 4 letech od koupě',NULL),(14,'Technická kontrola vozidla - čtyřletá','{\"value\":\"48 month\",\"text\":\"48 měsíců\"}','Nově koupená vozidla do 4 let stáří',NULL);
/*!40000 ALTER TABLE `tool_revision_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tool_supplier`
--

DROP TABLE IF EXISTS `tool_supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tool_supplier` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tool_supplier`
--

LOCK TABLES `tool_supplier` WRITE;
/*!40000 ALTER TABLE `tool_supplier` DISABLE KEYS */;
/*!40000 ALTER TABLE `tool_supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'','Lenka ','Rosecká','040','rosecka',NULL,'2019-01-08 20:08:55'),(2,'Bc.','Lenka ','Rosecká ml.','063','lrosecka',NULL,'2019-01-08 20:08:55'),(3,'','Petr ','Bořil','001','boril',NULL,'2019-01-08 20:08:55'),(4,'','Martin ','Bořil','054','mboril',NULL,'2019-01-08 20:08:55'),(5,'','Richard ','Joura','057','joura',NULL,'2019-01-08 20:08:55'),(6,'','Jaromír ','Řezník','058','reznik',NULL,'2019-01-08 20:08:55'),(7,'','Aleš ','Zadina','061','zadina',NULL,'2019-01-08 20:08:55'),(8,'','Jaroslav','Rosecký','004','',NULL,'2019-01-08 20:08:55'),(9,'','Jiří ','Havlík','005','',NULL,'2019-01-08 20:08:55'),(10,'','Luboš ','Kudrna','006','kudrna',NULL,'2019-01-08 20:08:55'),(11,'','Josef ','Muller','007','',NULL,'2019-01-08 20:08:55'),(12,'','Ludvík ','Karásek','008','karasek',NULL,'2019-01-08 20:08:55'),(13,'','Jan ','Gregor','015','',NULL,'2019-01-08 20:08:55'),(14,'','Michal ','Kružík','018','kruzik',NULL,'2019-01-08 20:08:55'),(15,'','Pavel  ','Weinhofer','019','weinhofer',NULL,'2019-01-08 20:08:55'),(16,'Ing.','Pavel ','Havlíček','024','havlicek',NULL,'2019-01-08 20:08:55'),(17,'','Michal ','Kolouch','030','kolouch',NULL,'2019-01-08 20:08:55'),(18,'','Petr ','Kozel','038',NULL,NULL,'2019-01-08 20:08:55'),(19,'','Vladimír ','Brož','039',NULL,NULL,'2019-01-08 20:08:55'),(20,'','Josef',' Bodlák','044',NULL,NULL,'2019-01-08 20:08:55'),(21,'','Tomáš','Vytlačil','051','vytlacil',NULL,'2019-01-08 20:08:55'),(22,'','Hana ','Žáková','056',NULL,NULL,'2019-01-08 20:08:55'),(23,'','Martin ','Klusáček','059','klusacek',NULL,'2019-01-08 20:08:55'),(24,'','Tomáš ','Hladík','064',NULL,NULL,'2019-01-08 20:08:55'),(25,'','František ','Mach','065',NULL,NULL,'2019-01-08 20:08:55'),(26,'','Jiří ','Havelka','066','havelka',NULL,'2019-01-08 20:08:55'),(27,'','Vojtěch ','Rolínek','067','rolinek',NULL,'2019-01-08 20:08:55'),(28,'','Jan ','Kanalas','069','kanalas',NULL,'2019-01-08 20:08:55'),(29,'','Martin ','Zitka','070',NULL,NULL,'2019-01-08 20:08:55'),(30,'','',NULL,NULL,NULL,'2018-12-14 14:09:17','2019-01-08 20:08:55'),(31,' ','Jan','Žák','071','zak',NULL,'2019-01-08 20:08:55'),(32,'','test','michal','sadfd','fdas','2019-01-08 20:13:39','2019-01-08 20:13:17');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_permission`
--

DROP TABLE IF EXISTS `user_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_permission` (
  `userId` int(11) NOT NULL,
  `userPermissionId` int(11) NOT NULL,
  PRIMARY KEY (`userId`,`userPermissionId`),
  KEY `userPermissionId` (`userPermissionId`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_permission_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `user_permission_ibfk_2` FOREIGN KEY (`userPermissionId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_permission`
--

LOCK TABLES `user_permission` WRITE;
/*!40000 ALTER TABLE `user_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_permissions`
--

DROP TABLE IF EXISTS `user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_permissions`
--

LOCK TABLES `user_permissions` WRITE;
/*!40000 ALTER TABLE `user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse`
--

DROP TABLE IF EXISTS `warehouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse`
--

LOCK TABLES `warehouse` WRITE;
/*!40000 ALTER TABLE `warehouse` DISABLE KEYS */;
/*!40000 ALTER TABLE `warehouse` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-14  6:35:42
