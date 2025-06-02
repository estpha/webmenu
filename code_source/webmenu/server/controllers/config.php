<?php
include_once('../services/ConfigDB.php');
include_once('../services/SessionCheck.php');
session_start();

//créer SessionCheck
$session = new SessionCheck;
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  // Vérifie si l'action reçue dans la requête GET est égale à "getConf"
  if ($_GET['action'] == "getConf") {
    // Crée une instance de la classe ConfigDB, probablement pour récupérer les configurations de la base de données
    $listeConf = new ConfigDB();
    // Appelle la méthode `getInJson()` de la classe ConfigDB pour obtenir les configurations sous forme de JSON
    // et affiche la réponse JSON directement
    echo $listeConf->getInJson();
  }
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Vérifie si l'action reçue dans la requête POST est égale à "connect"
  if (isset($_POST['action']) == "connect") {
    // Crée une instance de la classe ConfigDB (probablement pour gérer la base de données de la configuration)
    $login = new ConfigDB();
    // Vérifie si le mot de passe a été fourni dans la requête POST
    if (isset($_POST['password'])) {
      // Vérifie si le mot de passe fourni correspond à un mot de passe valide dans la base de données
      if ($login->checklogin($_POST['password'])) {
        // Si le mot de passe est valide, une session est ouverte
        $session->openSession();
        // Retourne une réponse JSON avec 'result' égal à 'true' pour indiquer une connexion réussie
        $data = array('result' => 'true');
        echo json_encode($data);
      } else {
        // Si le mot de passe est incorrect, la session est détruite
        $session->destroySession();
        // Retourne une réponse JSON avec 'result' égal à 'false' pour indiquer un échec de connexion
        $data = array('result' => 'false');
        echo json_encode($data);
      }
    } else {
      // Si le mot de passe n'est pas fourni, la session est détruite
      $session->destroySession();
      // Retourne une réponse JSON avec 'result' égal à 'false' pour indiquer que la connexion a échoué (absence de mot de passe)
      $data = array('result' => 'false');
      echo json_encode($data);
    }
  }
  // Si l'action reçue est "disconnect", l'utilisateur demande une déconnexion
  else if ($_POST['action'] == "disconnect") {
    $session->destroySession();
    $data = array('result' => 'true');
    echo json_encode($data);
  }

}
?>