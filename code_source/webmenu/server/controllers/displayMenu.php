<?php
// classe pour la lecture pas de sécurité
include_once('../services/ArticleDB.php');
session_start();
//créer SessionCheck


if (isset($_SERVER['REQUEST_METHOD'])) {
  // Vérifie si la méthode de la requête HTTP est de type GET
  if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Vérifie si l'action demandée est 'getArticlesByGroup'
    if ($_GET['action'] == "getArticlesByGroup") {
      // Crée une nouvelle instance de la classe ArticleDB
      $listeArticles = new ArticleDB();
      // Appelle la méthode getGroupedArticlesJSON de la classe ArticleDB pour obtenir
      // les articles regroupés par groupe au format JSON
      echo $listeArticles->getGroupedArticlesJSON();
    }
  }

}
?>