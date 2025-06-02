<?php
include_once('ServicesDB.php');
include_once('../beans/Group.php');
class GroupDB
{

    /**
     * méthode appelé pour récupérer tous les groupes
     */
    public function getAll()
    {
        // La requête SQL récupère l'ID et le nom de tous les groupes, triés par nom
        $sql = "SELECT id, name FROM menu_display.group order by name";
        $params = array(); // Aucun paramètre n'est nécessaire ici
        $count = 0; // Initialisation d'un compteur pour l'index des groupes
        $listeGroupes = array(); // Tableau pour stocker les groupes récupérés

        // Obtention de l'instance de la connexion à la base de données
        $connect = ServicesDB::getInstance();

        // Exécution de la requête SQL et récupération des résultats dans la variable $groupes
        $groupes = $connect->selectQuery($sql, $params);

        // Parcours de chaque ligne de résultat
        foreach ($groupes as $data) {
            // Création d'un objet Group pour chaque groupe trouvé
            $groupe = new Group(
                $data['id'], // ID du groupe
                $data['name'], // Nom du groupe
            );

            // Ajout de l'objet Group au tableau $listeGroupes
            $listeGroupes[$count++] = $groupe;
        }

        // Retourne la liste des groupes
        return $listeGroupes;
    }


    /**
     * méthode pour mettre en forme en JSON les données
     */
    public function getInJson()
    {
        // Récupère tous les groupes via la méthode getAll()
        $listeGroupes = $this->getAll();

        // Initialisation d'un tableau vide pour stocker les résultats
        $result = [];

        // Parcours de chaque objet groupe dans la liste des groupes
        foreach ($listeGroupes as $groupe) {
            // Convertit chaque objet groupe en tableau associatif (via la méthode toJSON)
            $result[] = $groupe->toJSON();
        }

        // Convertit le tableau $result en une chaîne JSON avec un formatage lisible (indenté)
        return json_encode($result, JSON_PRETTY_PRINT);
    }


}
?>