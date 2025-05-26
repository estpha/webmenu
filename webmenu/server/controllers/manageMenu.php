<?php
// avec login et session, page admin, gestionMenu.php
include_once('../services/SessionCheck.php');
include_once('../services/ConfigBD.php');
include_once('../services/ArticleBD.php');
session_start();
//créer SessionCheck

$session = new SessionCheck;
if (isset($_SERVER['REQUEST_METHOD'])) {
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['action']) == "connect") {
      //créer loginBD
      $login = new ConfigBD();
      //test retour boolean
      if (isset($_POST['password'])) {
        if ($login->checklogin($_POST['password'])) {
          $session->openSession();
          $data = array('result' => 'true');
          echo json_encode($data);
        } else {
          $session->destroySession();
          $data = array('result' => 'false');
          echo json_encode($data);
        }
      } else {
        $session->destroySession();
        $data = array('result' => 'false');
        echo json_encode($data);
      }
    } else if ($_POST['action'] == "disconnect") {
      $session->destroySession();
      $data = array('result' => 'true');
      echo json_encode($data);
    }
  }
  if ($session->isConnected()) {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      if ($_GET['action'] == "getArticlesGestion") {
        $listeArticles = new ArticleBD();
        echo $listeArticles->getGroupedArticlesJSON();
      }
    }
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
      // Read the raw input data (JSON)
      $data = json_decode(file_get_contents("php://input"), true);

      // Check if the action is "ajoutArticle"
      if (isset($data['action']) && $data['action'] === 'ajoutArticle') {
        $ajoutArticle = new ArticleBD();
        $result = $ajoutArticle->addArticle($data['description'], $data['quantite'], $data['prix'], $data['groupe']);

        // Decode the JSON result from the $result
        $decodedResult = json_decode($result, true);

        // Check if the result is "true" in the decoded JSON
        if (isset($decodedResult['result']) && $decodedResult['result'] === 'true') {
          echo $result; // Send the result back as a JSON response
        } else {
          http_response_code(503); // Service Unavailable (if result is not true)
        }
      }
    }
  } else {
    http_response_code(401);
  }
}
?>