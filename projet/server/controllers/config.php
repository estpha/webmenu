<?php
include_once('../services/ConfigBD.php');
include_once('../services/SessionCheck.php');
session_start();

//créer SessionCheck
$session = new SessionCheck;
// if ($_SERVER['REQUEST_METHOD'] == 'POST'){
//   if(isset($_POST['action']) == "connect"){       
//     //créer ConfigBD.php
//     $login = new ConfigBD();
//     //test retour boolean
//     if(isset($_POST['password']) ){
//       if ($login->checklogin($_POST['password'])) {
//         $session->openSession();              
//         echo '<result>true</result>';
//       }else{
//         $session->destroySession();
//         echo '<result>le login est faux</result>';
//       }
//     }else{
//       $session->destroySession();
//       echo '<result>false</result>';
//     }                 
//   }else if($_POST['action'] == "disconnect") {
//       $session->destroySession();
//       echo '<result>true</result>';
//   }
// }
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  if ($_GET['action'] == "getConf") {
    $listeConf = new ConfigBD();
    echo $listeConf->getInJson();
  }
  // if ($session->isConnected()) {
  //   $listeLogin = new ConfigBD();
  //   echo '<result>true</result>';
  // } else {
  //   http_response_code(401);
  // }
}
?>