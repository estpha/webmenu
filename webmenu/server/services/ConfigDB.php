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
        $sql = "SELECT password FROM configuration where password = :mdp";
        $params = array("mdp" => $pwd);
        $connect = ServicesDB::getInstance();
        $mdpResult = $connect->executeQuery($sql, $params);
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
        $sql = "SELECT * FROM configuration";
        $params = array();
        $count = 0;
        $listeConfigs = array();
        $connect = ServicesDB::getInstance();
        $configs = $connect->selectQuery($sql, $params);
        foreach ($configs as $data) {
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
            $listeConfigs[$count++] = $config;
        }
        return $listeConfigs;
    }

    /**
     * méthode pour mettre en forme en json
     */
    public function getInJson()
    {
        $listeConfigs = $this->getAll();
        $result = [];
        foreach ($listeConfigs as $config) {
            $result[] = json_decode($config->toJson(), true);
        }
        return json_encode($result, JSON_PRETTY_PRINT);
    }
}
?>