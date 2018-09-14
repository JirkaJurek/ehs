-- MySQL Workbench Synchronization
-- Generated: 2018-09-13 23:41
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Michal Rosecký

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE TABLE IF NOT EXISTS `tool` (
  `id` INT(11) NOT NULL,
  `supplier` JSON NULL,
  `categories` JSON NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `revizion` VARCHAR(255) NULL DEFAULT NULL,
  `startWork` DATETIME NULL DEFAULT NULL,
  `seriesNumber` VARCHAR(255) NULL DEFAULT NULL,
  `internal` VARCHAR(255) NULL DEFAULT NULL,
  `external` VARCHAR(255) NULL DEFAULT NULL,
  `externalMaintenance` INT(11) NULL DEFAULT NULL,
  `nextRevision` DATETIME NULL DEFAULT NULL,
  `comment` TEXT(10000) NULL DEFAULT NULL,
  `employee` JSON NULL,
  `revisions` JSON NULL,
  `repair` JSON NULL,
  `price` DECIMAL(10,2) NULL DEFAULT NULL,
  `filter1` VARCHAR(255) NULL DEFAULT NULL,
  `filter2` VARCHAR(255) NULL DEFAULT NULL,
  `filter3` VARCHAR(255) NULL DEFAULT NULL,
  `files` JSON NULL,
  `guaranteeInto` DATETIME NULL DEFAULT NULL,
  `supplierId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `supplierId_idx` (`supplierId` ASC) VISIBLE,
  CONSTRAINT `supplierId`
    FOREIGN KEY (`supplierId`)
    REFERENCES `tool_supplier` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `tool_categories` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `parentId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `parentId` (`parentId` ASC) VISIBLE,
  UNIQUE INDEX `uni` (`id` ASC, `parentId` ASC) VISIBLE,
  CONSTRAINT `parentId`
    FOREIGN KEY (`id`)
    REFERENCES `tool_categories` (`parentId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `tool_category` (
  `id_tool` INT(11) NOT NULL,
  `id_category` INT(11) NOT NULL,
  PRIMARY KEY (`id_tool`, `id_category`),
  INDEX `category_idx` (`id_category` ASC) VISIBLE,
  CONSTRAINT `tool`
    FOREIGN KEY (`id_tool`)
    REFERENCES `tool` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `category`
    FOREIGN KEY (`id_category`)
    REFERENCES `tool_categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;