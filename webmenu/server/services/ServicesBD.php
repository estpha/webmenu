<?php
class ServicesBD
{
  private static $connexion;
  private $pdo;

  /**
   * fonction pour ouvrir une connexion à la base de données.
   */
  private function __construct()
  {
    try {
      //local
      $this->pdo = new PDO('mysql:host=localhost;port=3306;dbname=menu_display;charset=utf8', 'root', '');
      //hébergé
      // $this->pdo = new PDO('mysql:host=localhost;port=3306;dbname=phame_webmenudb;charset=utf8', 'phame_admin', 'Pa$$w0rd12345!');
    } catch (PDOException $e) {
      print "Erreur !: " . $e->getMessage() . "<br/>";
      die();
    }
  }

  /**
   * fonction permettant d'exécuter un select dans MySQL.
   * à utiliser pour les SELECT.
   * 
   * @param {type} String
   * @param {type} array()
   * @return toutes les lignes du select
   */
  public function selectQuery($sql, $params)
  {
    try {
      $stmt = $this->pdo->prepare($sql);
      $stmt->execute($params);
      return $stmt->fetchAll();
    } catch (PDOException $e) {
      print "Erreur !: " . $e->getMessage() . "<br/>";
      die();
    }
  }

  /**
   * fonction permettant d'exécuter une requête MySQL.
   * à utiliser pour les UPDATE, DELETE, INSERT.
   *
   * @param {type} String
   * @param {type} array()
   * @return true si la requête a été executée
   */
  public function executeQuery($sql, $params = array())
  {
    try {
      $stmt = $this->pdo->prepare($sql);
      $stmt->execute($params);
      return $stmt;
    } catch (PDOException $e) {
      error_log("Erreur !: " . $e->getMessage());
      return false;
    }
  }

  /**
   * méthode indiquant que le bean connexion est un Singleton
   */
  public static function getInstance()
  {
    if (!self::$connexion) {
      self::$connexion = new self();
    }
    return self::$connexion;
  }
}
?>