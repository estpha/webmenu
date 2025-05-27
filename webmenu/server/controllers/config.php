<?php
include_once('../services/ConfigDB.php');
include_once('../services/SessionCheck.php');
session_start();

//créer SessionCheck
$session = new SessionCheck;
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  if ($_GET['action'] == "getConf") {
    $listeConf = new ConfigDB();
    echo $listeConf->getInJson();
  }
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  if (isset($_POST['action']) == "connect") {
    //créer loginBD
    $login = new ConfigDB();
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
?>