<?php
// avec login et session, page admin, gestionMenu.php
include_once('../services/SessionCheck.php');
include_once('../services/ConfigBD.php');
session_start();
//créer SessionCheck

$session = new SessionCheck;
if (isset($_SERVER['REQUEST_METHOD'])) {

  if ($session->isConnected()) {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      if ($_GET['action'] == "getArticlesGestion") {
        $listeArticles = new ArticleBD();
        echo $listeArticles->getGroupedArticlesJSON();
        // fonctionne mais doit renvoyer pas connecter :) si user pas connecté
      }
    }
    // if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    //   if ($_POST['action'] == "modifierBoisson") {
    //     $editBoisson = new BoissonBD();
    //     $result = $editBoisson->modifBoisson($_POST['pk'], $_POST['nom'], $_POST['description'], $_POST['volume'], $_POST['quantite'], $_POST['prix'], $_POST['alcool']);
    //     if ($result === "<result>true</result>") {
    //       echo $result;
    //     } else if ($result === "<result>modification KO<</result>") {
    //       http_response_code(503);
    //     }
    //   }
    // }
  }
}
?>