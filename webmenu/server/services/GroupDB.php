<?php
include_once('ServicesDB.php');
include_once('../beans/Group.php');
class GroupDB
{

    /**
     * méthode appelé pour récupérer tous les articles
     */
    public function getAll()
    {
        $sql = "SELECT id, name FROM menu_display.group order by name";
        $params = array();
        $count = 0;
        $listeGroupes = array();
        $connect = ServicesDB::getInstance();
        $groupes = $connect->selectQuery($sql, $params);
        foreach ($groupes as $data) {
            $groupe = new Group(
                $data['id'],
                $data['name'],
            );
            $listeGroupes[$count++] = $groupe;
        }
        return $listeGroupes;
    }

    /**
     * méthode pour mettre en forme en JSON
     */
    public function getInJson()
    {
        $listeGroupes = $this->getAll();
        $result = [];

        foreach ($listeGroupes as $groupe) {
            $result[] = $groupe->toJSON(); // Use array, not JSON string
        }

        return json_encode($result, JSON_PRETTY_PRINT);
    }

}
?>