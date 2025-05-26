<?php
include_once('ServicesBD.php');
include_once('../beans/Article.php');
class ArticleBD
{

    /**
     * méthode appelé pour récupérer tous les articles
     */
    public function getAll()
    {
        $sql = "SELECT * FROM article";
        $params = array();
        $count = 0;
        $listeArticles = array();
        $connect = ServicesBD::getInstance();
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
        $sql = "SELECT menu_display.article.id, menu_display.article.description, 
                menu_display.article.quantity, menu_display.article.soldout, 
                menu_display.article.price,menu_display.article.color, 
                menu_display.group.group as nomGroup, menu_display.article.order as ordreArticle,
                menu_display.group.page as ordrePage, menu_display.group.order as ordreGroup
                FROM menu_display.article 
                inner join menu_display.group 
                on menu_display.article.group_id = menu_display.group.id
                order by ordrePage, ordreGroup, ordreArticle";

        $params = array();
        $connect = ServicesBD::getInstance();
        $articles = $connect->selectQuery($sql, $params);

        // Grouping logic
        $groupedArticles = [];
        foreach ($articles as $data) {
            $groupName = $data['nomGroup'];

            // Initialize the group if it doesn't exist
            if (!isset($groupedArticles[$groupName])) {
                $groupedArticles[$groupName] = [
                    'ordrePage' => $data['ordrePage'],
                    'ordreGroup' => $data['ordreGroup'],
                    'articles' => [] // Initialize the articles array
                ];
            }

            // Create an Article object
            $article = new Article(
                $data['id'],
                $data['description'],
                $data['quantity'],
                $data['soldout'],
                $data['price'],
                $data['color'],
                $data['nomGroup'], // Pass the group name to the constructor if needed
                $data['ordreArticle']
            );

            // Add the Article object to the articles array
            $groupedArticles[$groupName]['articles'][] = $article;
        }

        return $groupedArticles;

    }

    /**
     * méthode pour mettre en forme en JSON les articles
     */
    public function getInJson()
    {
        $listeArticles = $this->getAll();
        $result = [];

        foreach ($listeArticles as $article) {
            $result[] = $article->toJson();
        }

        return json_encode($result, JSON_PRETTY_PRINT);
    }

    public function getGroupedArticlesJSON()
    {
        $groupedArticles = $this->getAllByGroup();
        // print_r($groupedArticles);
        // exit;
        // Convert Article objects to JSON-friendly arrays
        foreach ($groupedArticles as $groupName => &$groupData) {
            // Map the articles to JSON-friendly format
            $groupData['articles'] = array_map(function ($article) {
                return json_decode($article->toJSON(), true); // Use the toJSON method of the Article class
            }, $groupData['articles']);
        }

        return json_encode($groupedArticles, JSON_PRETTY_PRINT);
    }

    public function addArticle($description, $quantite, $prix, $groupe)
    {
        $escapedNom = htmlspecialchars($description, ENT_QUOTES, 'UTF-8');
        $escapedDescription = htmlspecialchars($quantite, ENT_QUOTES, 'UTF-8');

        $connect = ServicesBD::getInstance();

        $sql = "INSERT INTO menu_display.article (description, quantity, price, group_id, `order`)
            SELECT :description, :quantite, :prix, menu_display.group.id, 
                   COALESCE(MAX(menu_display.article.`order`), 0) + 10
            FROM menu_display.group
            INNER JOIN menu_display.article ON menu_display.group.id = menu_display.article.group_id
            WHERE menu_display.group.group = :groupe";

        $params = ['description' => $description, 'quantite' => $quantite, 'prix' => $prix, 'groupe' => $groupe];
        $resultat = $connect->executeQuery($sql, $params);
        if ($resultat === true) {
            $data = array('result' => 'true');
            echo json_encode($data);
        } else {
            $data = array('result' => 'false');
            echo json_encode($data);
        }
    }
}
?>