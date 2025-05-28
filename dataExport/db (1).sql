-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: menu_display
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.13-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,'Eau plate','5dl',0,4.00,NULL,1,10),(2,'Eau gazeuse','5dl',0,4.00,NULL,1,20),(3,'Thé froid','5dl',0,4.50,NULL,1,30),(4,'Coca-Cola','5dl',0,4.50,NULL,1,40),(5,'Coca-Cola zéro','5dl',0,4.50,NULL,1,50),(6,'Jus de pomme','3.33dl',0,4.00,NULL,1,60),(7,'Café',NULL,0,3.50,NULL,1,70),(8,'Thé',NULL,0,3.50,NULL,1,80),(9,'La Bolze','3.33dl',0,5.00,NULL,2,10),(10,'La Patriote','3.33dl',0,5.00,NULL,2,20),(11,'Cramine - Schwarz Bier','3.33dl',0,6.00,NULL,2,30),(12,'Vully','1dl',0,4.00,NULL,3,10),(13,'Domaine des Faverges','1dl',0,5.50,NULL,3,10),(14,'Domaine des Faverges Assemblage rouge','1dl',0,5.50,NULL,4,20),(15,'Le gamaret Vully','1dl',0,5.00,NULL,4,10),(16,'Seigneur de Glâne, Mousseux demi-sec','1dl',0,6.00,NULL,9,10),(17,'Chips nature','40g',0,2.50,NULL,8,20),(18,'Chips paprika','40g',0,2.50,NULL,8,10),(19,'Sandwich au jambom',NULL,0,4.50,NULL,7,10),(20,'Sandwich au thon',NULL,0,5.00,NULL,7,20),(21,'Planchette viande',NULL,0,17.50,NULL,10,10),(22,'Planchette fromage',NULL,0,17.50,NULL,10,20),(23,'Planchette mixte',NULL,0,22.50,NULL,10,30),(38,'Tequila boom boom','2ml',0,2.00,NULL,6,10),(79,'Vodka','2ml',1,5.00,NULL,6,1);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `configuration`
--

LOCK TABLES `configuration` WRITE;
/*!40000 ALTER TABLE `configuration` DISABLE KEYS */;
INSERT INTO `configuration` VALUES (1,5000,'fr.','Emf12345',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `configuration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (1,'Boissons sans alcool',1,1,NULL),(2,'Bières',1,2,NULL),(3,'Vin blanc',2,1,NULL),(4,'Vin rouge',2,2,NULL),(5,'Shot',3,1,NULL),(6,'Alcool fort',3,2,NULL),(7,'Sandwich',3,4,NULL),(8,'Snack',3,3,NULL),(9,'Vin pétillant',2,3,NULL),(10,'Planchette',3,5,NULL);
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-28 17:15:03
