-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `idcomments` int NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `time_comment` datetime NOT NULL,
  `posts_idposts` int NOT NULL,
  `user_iduser` int NOT NULL,
  PRIMARY KEY (`idcomments`),
  KEY `fk_comments_posts_idx` (`posts_idposts`),
  KEY `fk_comments_user1_idx` (`user_iduser`),
  CONSTRAINT `fk_comments_posts` FOREIGN KEY (`posts_idposts`) REFERENCES `posts` (`idposts`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_user` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'Commencez a discutez !','2020-12-17 14:07:03',1,26),(2,'Allons-y','2020-12-18 18:05:03',1,17),(29,'orem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the s when an unknown printer took a galley of type and scrambled it to make a type specimen book It has survived not only five centuries but also the leap into electronic typesetting remaining essentially unchanged It was popularised in the s with the release of Letraset sheets containing Lorem Ipsum passages and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum','2021-02-08 17:01:53',12,16),(40,'un commentaire','2021-02-09 12:12:53',12,16);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `idlikes` int NOT NULL AUTO_INCREMENT,
  `likes` smallint DEFAULT NULL,
  `dislikes` smallint DEFAULT NULL,
  `user_iduser` int NOT NULL,
  `posts_idposts` int NOT NULL,
  PRIMARY KEY (`idlikes`),
  KEY `fk_comments_likes_user1_idx` (`user_iduser`),
  KEY `fk_comments_likes_posts1_idx` (`posts_idposts`),
  CONSTRAINT `fk_likes_posts1` FOREIGN KEY (`posts_idposts`) REFERENCES `posts` (`idposts`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_likes_user` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (8,1,NULL,16,3),(16,1,NULL,16,12),(77,1,NULL,16,1);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `idposts` int NOT NULL AUTO_INCREMENT,
  `text_content` longtext,
  `image_content` varchar(255) DEFAULT NULL,
  `time_post` datetime NOT NULL,
  `user_iduser` int NOT NULL,
  PRIMARY KEY (`idposts`),
  KEY `fk_posts_user1_idx` (`user_iduser`),
  CONSTRAINT `fk_posts_user` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Bonjour bienvenue sur le nouveau réseaux social de Groupomania','http://localhost:3000/images/posts/Namibia_Namibrand_Family_Hideout2-1920x1080.jpg','2020-12-17 14:04:18',26),(3,'message test!','http://localhost:3000/images/posts/giphy.gif','2021-01-05 12:52:30',17),(12,'ajout d\'un nouveau post',NULL,'2021-02-06 14:22:07',16);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `iduser` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `profile_picture` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` char(60) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `description` text,
  `position` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `creation_date` date NOT NULL,
  `admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `ind_uni_email` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (16,'JJuser','http://localhost:3000/images/user/Capturekz.PNG1615199847676.png','test2@test.fr','$2b$10$5jVdfBDpuFeuAhW8S4lqjOZNvHlaK3h5LnAYqmQbVowfBXbGb3Ham','Jean-luc','Dupont','développeur web en devenir','développeur','1994-02-14','2021-01-06',1),(17,'jdoe2','http://localhost:3000/images/user/icon.png','test3@test.fr','$2b$10$Ot0ueto.hmHzM8QfzwuP.OZvjYJOufAVvEE3ud5M30ow4gs2CRlv.',NULL,NULL,NULL,NULL,NULL,'2021-01-13',0),(26,'admin','http://localhost:3000/images/user/icon.png','admin@admin.fr','$2b$10$TKE1hbyb3VeKO5GqgPuMAO/9U9bE9J41e3auwf4o.xDWyzCH9h2oC',NULL,NULL,NULL,NULL,NULL,'2021-03-08',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'groupomania'
--

--
-- Dumping routines for database 'groupomania'
--
/*!50003 DROP PROCEDURE IF EXISTS `likeDefault` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `likeDefault`(req INT, iduser INT, idpost INT)
BEGIN
IF (req = 1) THEN
 INSERT INTO likes (likes, posts_idposts, user_iduser) VALUES (1, idpost, iduser);
ELSEIF (req = -1) THEN
INSERT INTO likes (dislikes, posts_idposts, user_iduser) VALUES (1, idpost, iduser);
 END IF;
SELECT * FROM likes WHERE likes.posts_idposts = idpost AND likes.user_iduser = iduser;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `likeModification` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `likeModification`(req INT, iduser INT, idpost INT)
BEGIN
DECLARE liked INT;
DECLARE disliked INT;
SELECT likes, dislikes INTO liked, disliked FROM likes WHERE likes.posts_idposts = idpost AND likes.user_iduser = iduser;
IF (liked = req) OR (disliked = 1 AND req = -1) THEN
	DELETE FROM likes WHERE likes.posts_idposts = idpost AND likes.user_iduser = iduser;
ELSEIF (liked = 1 AND req = -1) THEN
	UPDATE likes SET likes.likes = null, likes.dislikes = 1 WHERE likes.posts_idposts = idpost AND likes.user_iduser = iduser;
ELSEIF (disliked = 1 AND req = 1) THEN
	UPDATE likes SET likes.likes = 1, likes.dislikes = null WHERE likes.posts_idposts = idpost AND likes.user_iduser = iduser;
END IF;
SELECT * FROM likes WHERE likes.posts_idposts = idpost AND likes.user_iduser = iduser;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-08 12:23:35
