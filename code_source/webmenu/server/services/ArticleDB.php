<?php
include_once('ServicesDB.php');
include_once('../beans/Article.php');
class ArticleDB
{

  /**
   * méthode appelé pour récupérer tous les articles par groupe, utilisé pour la gestion des articles
   */
  public function getArticleByGroup($groupId)
  {
    // Définition de la requête SQL pour récupérer les articles appartenant à un groupe spécifique
    $sql = "SELECT * FROM article WHERE group_id = :id ORDER BY menu_display.article.order";

    // Initialisation des paramètres pour la requête SQL
    $params = ['id' => $groupId];

    // Utilisé pour l'index des articles dans le tableau
    $count = 0;

    // Tableau des Articles récupérés, retourné à la fin
    $listeArticles = array();

    // Connexion à la base de données
    $connect = ServicesDB::getInstance();

    // Exécution de la requête avec les paramètres et récupération des résultats
    $articles = $connect->selectQuery($sql, $params);

    // Parcours des résultats pour instancier les objets Article
    foreach ($articles as $data) {
      // Création d'un nouvel objet Article à partir des données récupérées
      $article = new Article(
        $data['id'],           // ID de l'article
        $data['description'],  // Description de l'article
        $data['quantity'],     // Quantité disponible
        $data['soldout'],      // Indicateur de rupture de stock
        $data['price'],        // Prix de l'article
        $data['color'],        // Couleur de l'article
        $data['group_id'],     // ID du groupe auquel appartient l'article
        $data['order']         // Ordre de l'article dans le groupe
      );

      // Ajout de l'objet Article au tableau avec un l'index $count
      $listeArticles[$count++] = $article;
    }

    // Retourne la liste des objets Article correspondant au groupe sélectionné
    return $listeArticles;
  }


  /**
   * méthode pour mettre en forme en JSON les articles pour la gestion des articles
   */
  public function getInJson($groupId)
  {
    // Récupère la liste des articles associés à un groupe spécifique
    $listeArticles = $this->getArticleByGroup($groupId);

    // Initialisation d'un tableau pour stocker les articles sous forme de tableaux JSON
    $result = [];

    // Parcours chaque article dans la liste pour le transformer en tableau associatif
    foreach ($listeArticles as $article) {
      // Appelle la méthode toJson() sur l'article, puis décode le JSON en tableau associatif
      $result[] = json_decode($article->toJson(), true);
    }

    // Retourne la liste des articles encodée en JSON formaté pour une meilleure lisibilité
    return json_encode($result, JSON_PRETTY_PRINT);
  }


  /**
   * méthode appelé pour récupérer tous les articles par groupe, utilisé pour afficher le menu
   */
  public function getAllByGroup()
  {
    // Requête SQL pour récupérer les informations des articles et des groupes associés
    $sql = "SELECT 
                menu_display.article.id, 
                menu_display.article.description, 
                menu_display.article.quantity, 
                menu_display.article.soldout, 
                menu_display.article.price, 
                menu_display.article.color AS couleurArticle, 
                menu_display.group.name AS nomGroup, 
                menu_display.group.color AS couleurGroup, 
                menu_display.article.order AS ordreArticle, 
                menu_display.group.page AS ordrePage, 
                menu_display.group.order AS ordreGroup                
            FROM 
                menu_display.article 
            INNER JOIN 
                menu_display.group 
            ON 
                menu_display.article.group_id = menu_display.group.id
            ORDER BY 
                ordrePage, ordreGroup, ordreArticle";

    // Initialisation des paramètres pour la requête SQL (vide ici, mais prêt pour une extension future)
    $params = array();

    // Connexion à la base de données via le service ServicesDB
    $connect = ServicesDB::getInstance();

    // Exécution de la requête pour récupérer les articles sous forme de tableau associatif
    $articles = $connect->selectQuery($sql, $params);

    // Tableau destiné à regrouper les articles par groupe
    $groupedArticles = [];

    // Parcours des articles récupérés pour les organiser par groupes
    foreach ($articles as $data) {
      // Nom du groupe auquel appartient l'article
      $groupName = $data['nomGroup'];

      // Vérification si le groupe n'existe pas encore dans le tableau des groupes
      if (!isset($groupedArticles[$groupName])) {
        // Création d'une nouvelle entrée pour ce groupe avec ses métadonnées
        $groupedArticles[$groupName] = [
          'ordrePage' => $data['ordrePage'],        // Ordre de la page du groupe
          'ordreGroup' => $data['ordreGroup'],      // Ordre du groupe sur la page
          'couleurGroup' => $data['couleurGroup'],  // Couleur associée au groupe
          'articles' => []                          // Liste des articles du groupe (vide pour le moment)
        ];
      }

      // Création d'un nouvel objet Article avec les données actuelles
      $article = new Article(
        $data['id'],               // ID de l'article
        $data['description'],      // Description de l'article
        $data['quantity'],         // Quantité disponible de l'article
        $data['soldout'],          // Indicateur de rupture de stock
        $data['price'],            // Prix de l'article
        $data['couleurArticle'],   // Couleur associée à l'article
        $data['nomGroup'],         // Nom du groupe de l'article
        $data['ordreArticle']      // Ordre de l'article dans le groupe
      );

      // Ajout de l'article à la liste des articles du groupe correspondant
      $groupedArticles[$groupName]['articles'][] = $article;
    }

    // Retourne le tableau structuré contenant les groupes et leurs articles
    return $groupedArticles;
  }

  /**
   * méthode utilisé pour mettre en forme les articles récupéré en tableau json pour l'affichage du menu
   */
  public function getGroupedArticlesJSON()
  {
    // Récupère les articles groupés sous forme de tableau structuré
    $groupedArticles = $this->getAllByGroup();

    // Parcourt chaque groupe d'articles pour transformer les objets Article en tableaux JSON
    foreach ($groupedArticles as $groupName => $groupData) {
      // Transformation de chaque objet Article en un tableau associatif JSON
      $groupData['articles'] = array_map(function ($article) {
        // Appelle la méthode toJSON() de l'objet Article, puis décode le JSON en tableau associatif
        return json_decode($article->toJSON(), true);
      }, $groupData['articles']);

      // Réassignation des données modifiées dans le tableau principal
      $groupedArticles[$groupName] = $groupData;
    }

    // Encode le tableau final en JSON formaté pour une meilleure lisibilité
    return json_encode($groupedArticles, JSON_PRETTY_PRINT);
  }




  /**
   * méthode utilisé pour l'ajout d'un article dans la base de données
   * @param string $description
   * @param string $quantite
   * @param double $prix
   * @param int $groupe
   * @param int $ordre
   */
  public function addArticle($description, $quantite, $prix, $groupe, $ordre)
  {
    // Échappe les caractères spéciaux dans la description et la quantité pour prévenir les injections sql
    $escapedDescription = htmlspecialchars($description, ENT_QUOTES, 'UTF-8');
    $escapedQuantite = htmlspecialchars($quantite, ENT_QUOTES, 'UTF-8');

    // Définition de la requête SQL pour insérer un nouvel article dans la base de données
    $sql = "INSERT INTO menu_display.article (description, quantity, price, group_id, menu_display.article.order)
                values (:description, :quantite, :prix, :groupe, :ordre)";

    // Association des paramètres à la requête SQL
    $params = [
      'description' => $escapedDescription,
      'quantite' => $escapedQuantite,
      'prix' => $prix,
      'groupe' => $groupe,
      'ordre' => $ordre
    ];

    // Obtention d'une instance de la connexion à la base de données
    $connect = ServicesDB::getInstance();

    // Exécution de la requête d'insertion avec les paramètres
    $resultat = $connect->executeQuery($sql, $params);

    // Vérification de l'exécution réussie de la requête
    if ($resultat && $resultat->rowCount() > 0) {
      // Si l'insertion a réussi, retourner un tableau avec 'result' à true
      return ['result' => 'true'];
    } else {
      // Sinon, retourner 'false' avec un message d'erreur
      return ['result' => 'false', 'message' => 'No rows inserted'];
    }
  }


  /**
   * méthode utilisé pour la modification d'un article
   * @param int $id
   * @param string $description
   * @param int $order
   * @param int $soldout
   */
  public function editArticle($id, $description, $order, $soldout)
  {
    // Échappe les caractères spéciaux dans la description pour prévenir les injections sql
    $escapedDescription = htmlspecialchars($description, ENT_QUOTES, 'UTF-8');

    // Définition de la requête SQL pour mettre à jour un article spécifique
    $sql = "UPDATE menu_display.article
            SET description = :description, menu_display.article.order = :order, soldout = :soldout
            WHERE id = :id";

    // Définition des paramètres pour la requête SQL
    $params = [
      'id' => $id,                          // ID de l'article à mettre à jour
      'description' => $escapedDescription, // Nouvelle description (échappée)
      'order' => $order,                    // Nouvel ordre de l'article
      'soldout' => $soldout                 // Statut de disponibilité (rupture de stock ou non)
    ];

    // Obtient une instance du service de base de données
    $connect = ServicesDB::getInstance();
    // Exécution de la requête SQL avec les paramètres
    $resultat = $connect->executeQuery($sql, $params);

    // Vérifie si la requête a réussi et si des lignes ont été affectées
    if ($resultat && $resultat->rowCount() > 0) {
      return ['result' => 'true'];
    } else {
      return ['result' => 'false', 'message' => 'No rows inserted'];
    }
  }


  /**
   * méthode utilisé pour la suppression d'un article
   * @param int $id
   */
  public function deleteArticle($id)
  {
    // Définition de la requête SQL pour supprimer un article avec un ID spécifique
    $sql = "DELETE FROM menu_display.article WHERE id = :id";

    // Définition des paramètres pour la requête préparée
    $params = [
      'id' => $id // Identifiant de l'article à supprimer
    ];

    // Obtention d'une instance de la connexion à la base de données
    $connect = ServicesDB::getInstance();

    // Exécution de la requête SQL avec les paramètres fournis
    $resultat = $connect->executeQuery($sql, $params);

    // Vérification du résultat de l'exécution
    if ($resultat && $resultat->rowCount() > 0) {
      return ['result' => 'true'];
    } else {
      return ['result' => 'false', 'message' => 'No rows inserted'];
    }
  }

}
?>