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
                $groupedArticles[$groupName] = [];
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

            // Add the Article object to the group
            $groupedArticles[$groupName][] = $article;
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

        // Convert Article objects to JSON-friendly arrays
        foreach ($groupedArticles as $groupName => &$articles) {
            $articles = array_map(function ($article) {
                return json_decode($article->toJSON(), true); // Use the toJSON method of the Article class
            }, $articles);
        }

        return json_encode($groupedArticles, JSON_PRETTY_PRINT);
    }


}
?>