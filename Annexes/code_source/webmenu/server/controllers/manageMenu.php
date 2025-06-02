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
    // Vérifie si la requête HTTP est de type GET
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      // Vérifie si l'action demandée est 'getArticles'
      if ($_GET['action'] == "getArticles") {
        // Crée une nouvelle instance de la classe ArticleDB
        $listeArticles = new ArticleDB();
        // Appelle la méthode getInJson de ArticleDB et passe l'ID d'article via le paramètre 'id' dans l'URL
        echo $listeArticles->getInJson($_GET['id']);
      }
      // Vérifie si l'action demandée est 'getGroup'
      if ($_GET['action'] == "getGroup") {
        // Crée une nouvelle instance de la classe GroupDB
        $listeGroupes = new GroupDB();
        // Appelle la méthode getInJson de GroupDB pour récupérer tous les groupes au format JSON
        echo $listeGroupes->getInJson();
      }
    }
    // Vérifie si la méthode HTTP utilisée pour la requête est PUT
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
      // Lit le corps de la requête et le décode en tableau associatif
      $data = json_decode(file_get_contents("php://input"), true);
      // Vérifie si une action spécifique est définie dans les données reçues
      if (isset($data['action']) && $data['action'] === 'ajoutArticle') {
        // Si l'action est 'ajoutArticle', instancie un objet ArticleDB pour gérer la base de données
        $ajoutArticle = new ArticleDB();
        // Appelle la méthode addArticle pour ajouter un nouvel article avec les données reçues
        $result = $ajoutArticle->addArticle(
          $data['description'], // Description de l'article
          $data['quantite'],    // Quantité initiale
          $data['prix'],        // Prix de l'article
          $data['groupe'],      // Groupe auquel appartient l'article
          $data['ordre']        // Ordre de l'article dans le groupe
        );
        // Vérifie si l'ajout de l'article a réussi (basé sur la clé 'result' dans la réponse)
        if (isset($result['result']) && $result['result'] === 'true') {
          // Renvoie le résultat sous forme de JSON
          echo json_encode($result);
        } else {
          // Si l'ajout échoue, retourne un code de réponse HTTP 503 (Service indisponible)
          http_response_code(503);
        }
      }
      // Vérifie si l'action est 'modifArticle'
      elseif ($data['action'] === 'modifArticle') {
        // Instancie un objet ArticleDB pour gérer la modification
        $ajoutArticle = new ArticleDB();
        // Appelle la méthode editArticle pour modifier un article existant
        $result = $ajoutArticle->editArticle(
          $data['id'],          // ID de l'article à modifier
          $data['description'], // Nouvelle description de l'article
          $data['order'],       // Nouvel ordre de l'article
          $data['soldout']      // Indicateur de disponibilité
        );
        // Vérifie si la modification de l'article a réussi
        if (isset($result['result']) && $result['result'] === 'true') {
          // Renvoie le résultat sous forme de JSON
          echo json_encode($result);
        } else {
          // Si la modification échoue, retourne un code de réponse HTTP 503
          http_response_code(503);
        }
      }
    }
    // Vérifie si la requête HTTP est de type DELETE
    if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
      // Récupère les données envoyées dans le corps de la requête (généralement au format JSON)
      $data = json_decode(file_get_contents("php://input"), true);
      // Vérifie si l'action est définie et si elle correspond à 'suppArticle' (suppression d'article)
      if (isset($data['action']) && $data['action'] === 'suppArticle') {
        // Crée une nouvelle instance de la classe ArticleDB, qui gère la base de données des articles
        $suppArticle = new ArticleDB();
        // Appelle la méthode deleteArticle pour supprimer l'article correspondant à l'ID passé dans la requête
        $result = $suppArticle->deleteArticle($data['id']);
        // Vérifie si la suppression a réussi (si 'result' est égal à 'true' dans la réponse)
        if (isset($result['result']) && $result['result'] === 'true') {
          // Si l'article a bien été supprimé, renvoie une réponse JSON indiquant le succès
          echo json_encode($result); // Envoie le résultat sous forme de réponse JSON
        } else {
          // Si la suppression a échoué, renvoie un code de statut HTTP 503 (Service Unavailable)
          http_response_code(503); // Code d'erreur indiquant que le service est indisponible
        }
      }
    }
  } else {
    // l'utilisateur n'est pas connecté
    http_response_code(401);
  }
}
?>