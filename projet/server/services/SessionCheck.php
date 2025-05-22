<?php
class SessionCheck{
  public function destroySession(){
    if (isset($_SESSION['log'])) {
      session_destroy();
    }    
  }

  public function isConnected(){
    return isset($_SESSION['log']);   
  }

  public function openSession(){
    $_SESSION['log'] = 'true';    
  }
}
?>