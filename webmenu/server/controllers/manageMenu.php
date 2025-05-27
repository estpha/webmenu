<?php
// avec login et session, page admin, gestionMenu.php
include_once('../services/SessionCheck.php');
include_once('../services/ArticleDB.php');
include_once('../services/GroupDB.php');
session_start();
//créer SessionCheck

$session = new SessionCheck;
if (isset($_SERVER['REQUEST_METHOD'])) {
  if ($session->isConnected()) {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      if ($_GET['action'] == "getArticles") {
        $listeArticles = new ArticleDB();
        echo $listeArticles->getInJson();
      }
      if ($_GET['action'] == "getGroup") {
        $listeGroupes = new GroupDB();
        echo $listeGroupes->getInJson();
      }
    }
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
      // Read the raw input data (JSON)
      $data = json_decode(file_get_contents("php://input"), true);

      // Check if the action is "ajoutArticle"
      if (isset($data['action']) && $data['action'] === 'ajoutArticle') {
        $ajoutArticle = new ArticleDB();
        $result = $ajoutArticle->addArticle($data['description'], $data['quantite'], $data['prix'], $data['groupe'], $data['ordre']);

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