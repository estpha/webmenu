<?php
include_once('ServicesDB.php');
include_once('../beans/Config.php');
class ConfigDB
{
    /**
     * méthode appelé pour vérifié si le mdp du login est correct ou non
     */
    public function checkLogin($pwd)
    {
        // Définition de la requête SQL pour vérifier si le mot de passe existe dans la table 'configuration'
        $sql = "SELECT password FROM configuration where password = :mdp";

        // Création des paramètres de la requête
        $params = array("mdp" => $pwd);

        // Obtention d'une instance de la connexion à la base de données
        $connect = ServicesDB::getInstance();

        // Exécution de la requête préparée avec les paramètres
        $mdpResult = $connect->executeQuery($sql, $params);

        // Vérification du nombre de lignes retournées par la requête
        if ($mdpResult->rowCount() == 1) {
            return true;
        } else {
            return false;
        }
    }


    /**
     * méthode appelé pour récupérer toutes les configurations
     */
    public function getAll()
    {
        // Définition de la requête SQL pour récupérer toutes les données de la table 'configuration'
        $sql = "SELECT * FROM configuration";

        // Initialisation d'un tableau vide pour les paramètres (aucun paramètre n'est nécessaire ici)
        $params = array();

        // Initialisation d'un compteur pour l'indexation des résultats
        $count = 0;

        // Initialisation d'un tableau vide pour stocker les objets Config
        $listeConfigs = array();

        // Obtention d'une instance de la connexion à la base de données
        $connect = ServicesDB::getInstance();

        // Exécution de la requête et récupération des résultats sous forme de tableau associatif
        $configs = $connect->selectQuery($sql, $params);

        // Parcours de chaque élément retourné par la requête
        foreach ($configs as $data) {
            // Création d'un objet Config pour chaque ligne récupérée
            $config = new Config(
                $data['id'],
                $data['refresh_time'],
                $data['money_unity'],
                $data['password'],
                $data['group_font'],
                $data['group_size'],
                $data['group_color'],
                $data['article_font'],
                $data['article_size'],
                $data['article_color'],
                $data['logo1'],
                $data['logo2']
            );

            // Ajout de l'objet Config au tableau listeConfigs
            $listeConfigs[$count++] = $config;
        }

        // Retourne le tableau des objets Config
        return $listeConfigs;
    }


    /**
     * méthode pour mettre en forme en json les données
     */
    public function getInJson()
    {
        // Récupère toutes les configurations en appelant la méthode getAll()
        $listeConfigs = $this->getAll();

        // Initialisation d'un tableau vide pour stocker les résultats
        $result = [];

        // Parcours de chaque objet Config dans le tableau $listeConfigs
        foreach ($listeConfigs as $config) {
            // Convertit l'objet Config en JSON et le décode en tableau associatif
            $result[] = json_decode($config->toJson(), true);
        }

        // Retourne le tableau des résultats en json
        return json_encode($result, JSON_PRETTY_PRINT);
    }

}
?>