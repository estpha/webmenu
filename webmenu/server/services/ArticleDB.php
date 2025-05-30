<?php
include_once('ServicesDB.php');
include_once('../beans/Article.php');
class ArticleDB
{

  /**
   * méthode appelé pour récupérer tous les articles
   */
  public function getArticleByGroup($groupId)
  {
    $sql = "SELECT * FROM article where group_id = :id order by menu_display.article.order";
    $params = ['id' => $groupId];
    $count = 0;
    $listeArticles = array();
    $connect = ServicesDB::getInstance();
    $articles = $connect->selectQuery($sql, $params);
    foreach ($articles as $data) {
      $article = new Article(
        $data['id'],
        $data['description'],
        $data['quantity'],
        $data['soldout'],
        $data['price'],
        $data['color'],
        $data['group_id'],
        $data['order']
      );
      $listeArticles[$count++] = $article;
    }
    return $listeArticles;
  }

  public function getAllByGroup()
  {
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

    $params = array();
    $connect = ServicesDB::getInstance();
    $articles = $connect->selectQuery($sql, $params);

    $groupedArticles = [];
    foreach ($articles as $data) {
      $groupName = $data['nomGroup'];

      if (!isset($groupedArticles[$groupName])) {
        $groupedArticles[$groupName] = [
          'ordrePage' => $data['ordrePage'],
          'ordreGroup' => $data['ordreGroup'],
          'couleurGroup' => $data['couleurGroup'],
          'articles' => []
        ];
      }

      $article = new Article(
        $data['id'],
        $data['description'],
        $data['quantity'],
        $data['soldout'],
        $data['price'],
        $data['couleurArticle'],
        $data['nomGroup'],
        $data['ordreArticle']
      );

      $groupedArticles[$groupName]['articles'][] = $article;
    }

    return $groupedArticles;
  }


  /**
   * méthode pour mettre en forme en JSON les articles
   */
  public function getInJson($groupId)
  {
    $listeArticles = $this->getArticleByGroup($groupId);
    $result = [];

    foreach ($listeArticles as $article) {
      $result[] = json_decode($article->toJson(), true);
    }

    return json_encode($result, JSON_PRETTY_PRINT);
  }

  public function getGroupedArticlesJSON()
  {
    $groupedArticles = $this->getAllByGroup();
    foreach ($groupedArticles as $groupName => &$groupData) {
      $groupData['articles'] = array_map(function ($article) {
        return json_decode($article->toJSON(), true);
      }, $groupData['articles']);
    }

    return json_encode($groupedArticles, JSON_PRETTY_PRINT);
  }



  public function addArticle($description, $quantite, $prix, $groupe, $ordre)
  {
    $escapedDescription = htmlspecialchars($description, ENT_QUOTES, 'UTF-8');
    $escapedQuantite = htmlspecialchars($quantite, ENT_QUOTES, 'UTF-8');

    $connect = ServicesDB::getInstance();

    $sql = "INSERT INTO menu_display.article (description, quantity, price, group_id, menu_display.article.order)
                values (:description, :quantite, :prix, :groupe, :ordre)";

    $params = [
      'description' => $escapedDescription,
      'quantite' => $escapedQuantite,
      'prix' => $prix,
      'groupe' => $groupe,
      'ordre' => $ordre
    ];

    $resultat = $connect->executeQuery($sql, $params);
    if ($resultat && $resultat->rowCount() > 0) {
      return ['result' => 'true'];
    } else {
      return ['result' => 'false', 'message' => 'No rows inserted'];
    }
  }

  public function editArticle($id, $description, $order, $soldout)
  {
    $escapedDescription = htmlspecialchars($description, ENT_QUOTES, 'UTF-8');

    $connect = ServicesDB::getInstance();

    $sql = "UPDATE menu_display.article
                SET description = :description, menu_display.article.order = :order,  soldout = :soldout
                WHERE id = :id";

    $params = [
      'id' => $id,
      'description' => $escapedDescription,
      'order' => $order,
      'soldout' => $soldout
    ];

    $resultat = $connect->executeQuery($sql, $params);
    if ($resultat && $resultat->rowCount() > 0) {
      return ['result' => 'true'];
    } else {
      return ['result' => 'false', 'message' => 'No rows inserted'];
    }
  }

  public function deleteArticle($id)
  {
    $connect = ServicesDB::getInstance();

    $sql = "DELETE FROM menu_display.article WHERE id = :id";

    $params = [
      'id' => $id
    ];

    $resultat = $connect->executeQuery($sql, $params);
    if ($resultat && $resultat->rowCount() > 0) {
      return ['result' => 'true'];
    } else {
      return ['result' => 'false', 'message' => 'No rows inserted'];
    }
  }
}
?>