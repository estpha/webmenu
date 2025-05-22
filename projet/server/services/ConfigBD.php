<?php
include_once('ServicesBD.php');
include_once('../beans/Config.php');
class ConfigBD
{
    /**
     * Méthode appelé pour vérifié si le mdp du login est correct ou non
     * @param {type} String
     * @param {type} String
     */
    public function checkLogin($pwd)
    {
        $sql = "SELECT password FROM configuration WHERE password = :password";
        $params = array(":mdp" => $pwd);
        $connect = ServicesBD::getInstance();
        $mdpResult = $connect->executeQuery($sql, $params);
        if ($mdpResult !== false && $mdpResult->rowCount() == 1) {
            $result = $mdpResult->fetch(PDO::FETCH_ASSOC);
            if ($pwd === $result['password']) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * méthode appelé pour récupérer tous les logins
     */
    public function getAll()
    {
        $sql = "SELECT * FROM configuration";
        $params = array();
        $count = 0;
        $listeConfigs = array();
        $connect = ServicesBD::getInstance();
        $configs = $connect->selectQuery($sql, $params);
        foreach ($configs as $data) {
            $config = new Config($data['id'], $data['refresh_time'], $data['money_unity'], 
                                $data['password'], $data['group_font'], $data['group_size'], 
                                $data['group_color'], $data['article_font'], $data['article_size'],
                                $data['article_color'], $data['logo1'], $data['logo2']
                            );
            $listeConfigs[$count++] = $config;
        }
        return $listeConfigs;
    }

    /**
     * méthode pour mettre en forme en xml les logins
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