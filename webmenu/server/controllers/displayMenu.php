<?php
// classe pour la lecture pas de sécurité
include_once('../services/ArticleDB.php');
session_start();
//créer SessionCheck


if (isset($_SERVER['REQUEST_METHOD'])) {
  if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if ($_GET['action'] == "getArticlesByGroup") {
      $listeArticles = new ArticleDB();
      echo $listeArticles->getGroupedArticlesJSON();
    }
  }
}
?>