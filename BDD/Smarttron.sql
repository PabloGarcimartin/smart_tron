-- MySQL Script generated by MySQL Workbench
-- Fri Apr 16 12:17:46 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Matches`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Matches` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Players`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Players` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Ref_matches_players`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Ref_matches_players` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idMatch` INT NULL,
  `idPlayer` INT NULL,
  `position` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `id_idx` (`idMatch` ASC) ,
  INDEX `idPlayer_idx` (`idPlayer` ASC) ,
  CONSTRAINT `idMatch`
    FOREIGN KEY (`idMatch`)
    REFERENCES `mydb`.`Matches` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idPlayer`
    FOREIGN KEY (`idPlayer`)
    REFERENCES `mydb`.`Players` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Steps`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Steps` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idMatchPlayer` INT NULL,
  `x` FLOAT NULL,
  `y` FLOAT NULL,
  `direction` FLOAT NULL,
  `left` VARCHAR(45) BINARY NULL,
  `right` VARCHAR(45) BINARY NULL,
  `score` DOUBLE NULL,
  `dead_next` VARCHAR(45) BINARY NULL,
  PRIMARY KEY (`id`),
  INDEX `id_idx` (`idMatchPlayer` ASC) ,
  CONSTRAINT `idMatchPlayer`
    FOREIGN KEY (`idMatchPlayer`)
    REFERENCES `mydb`.`Ref_matches_players` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
