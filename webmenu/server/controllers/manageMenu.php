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
        echo $listeArticles->getInJson($_GET['id']);
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
        $result = $ajoutArticle->addArticle(
          $data['description'],
          $data['quantite'],
          $data['prix'],
          $data['groupe'],
          $data['ordre']
        );

        if (isset($result['result']) && $result['result'] === 'true') {
          echo json_encode($result); // Send the result back as a JSON response
        } else {
          http_response_code(503); // Service Unavailable (if result is not true)
        }
      } elseif ($data['action'] === 'modifArticle') {
        $ajoutArticle = new ArticleDB();
        $result = $ajoutArticle->editArticle(
          $data['id'],
          $data['description'],
          $data['order'],
          $data['soldout']
        );

        if (isset($result['result']) && $result['result'] === 'true') {
          echo json_encode($result); // Send the result back as a JSON response
        } else {
          http_response_code(503); // Service Unavailable (if result is not true)
        }
      }
    }
    if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {

      $data = json_decode(file_get_contents("php://input"), true);

      if (isset($data['action']) && $data['action'] === 'suppArticle') {
        $suppArticle = new ArticleDB();
        $result = $suppArticle->deleteArticle($data['id']);

        if (isset($result['result']) && $result['result'] === 'true') {
          echo json_encode($result); // Send the result back as a JSON response
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