<?php
class SessionCheck
{
  /**
   * Fonction pour détruire la session si l'utilisateur est connecté
   */
  public function destroySession()
  {
    // Vérifie si la variable de session 'log' existe
    if (isset($_SESSION['log'])) {
      // Si la session existe, on la détruit
      session_destroy();
    }
  }

  /**
   * Fonction pour vérifier si l'utilisateur est connecté (si la session existe)
   */
  public function isConnected()
  {
    // Retourne vrai si la session 'log' existe, sinon retourne faux
    return isset($_SESSION['log']);
  }

  /**
   * Fonction pour ouvrir une session et marquer l'utilisateur comme connecté
   */
  public function openSession()
  {
    // Crée une variable de session 'log' et lui attribue la valeur 'true'
    $_SESSION['log'] = 'true';
  }

}
?>