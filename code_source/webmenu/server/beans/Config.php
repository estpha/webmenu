<?php
class Config
{
    private $id;
    private $refreshTime;
    private $moneyUnity;
    private $password;
    private $groupFont;
    private $groupSize;
    private $groupColor;
    private $articleFont;
    private $articleSize;
    private $articleColor;
    private $logo1;
    private $logo2;
    /**
     * constructeur du beans config
     * @param {type} Integer
     * @param {type} Integer
     * @param {type} String
     * @param {type} String
     * @param {type} String
     * @param {type} Double
     * @param {type} String
     * @param {type} String
     * @param {type} Double
     * @param {type} String
     * @param {type} Blob
     */
    public function __construct($id, $refreshTime, $moneyUnity, $password, $groupFont, 
    $groupSize, $groupColor, $articleFont, 
    $articleSize, $articleColor, $logo1, $logo2)
    {
        $this->id = $id;
        $this->refreshTime = $refreshTime;
        $this->moneyUnity = $moneyUnity;
        $this->password = $password;
        $this->groupFont = $groupFont;
        $this->groupSize = $groupSize;
        $this->groupColor = $groupColor;
        $this->articleFont = $articleFont;
        $this->articleSize = $articleSize;
        $this->articleColor = $articleColor;
        $this->logo1 = $logo1;
        $this->logo2 = $logo2;
    }

    /**
     * getter de la pk de la config
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * getter du temps de refresh pour la page à partir de la config
     */
    public function getRefreshTime()
    {
        return $this->refreshTime;
    }

    /**
     * getter de l'unité de monnaie utilisé à partir de la config
     */
    public function getMoneyUnity()
    {
        return $this->moneyUnity;
    }

    /**
     * getter du mot de passe de la config
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * getter de la police d'écriture des groupes à partir de la config
     */
    public function getGroupFont()
    {
        return $this->groupFont;
    }

    /**
     * getter de la taille de la police des groupes à partir de la config
     */
    public function getGroupSize()
    {
        return $this->groupSize;
    }

    /**
     * getter de la couleur de la police des groupes à partir de la config
     */
    public function getGroupColor()
    {
        return $this->groupColor;
    }

    /**
     * getter de la police des articles à partir de la config
     */
    public function getArticleFont()
    {
        return $this->articleFont;
    }

    /**
     * getter de la taille de la police des articles à partir de la config
     */
    public function getArticleSize()
    {
        return $this->articleSize;
    }

    /**
     * getter de la couleur des articles à partir de la config
     */
    public function getArticleColor()
    {
        return $this->articleColor;
    }

    /**
     * getter du logo 1 à partir de la config
     */
    public function getLogo1()
    {
        return $this->logo1;
    }

    /**
     * getter du logo 2 à partir de la config
     */
    public function getLogo2()
    {
        return $this->logo2;
    }

    /**
     * setter du temps de rechargement de la page
     * @param {type} Integer
     * @return void
     */
    public function setRefreshTime($refreshTime)
    {
        $this->refreshTime = $refreshTime;
    }

    /**
     * setter de l'unité de la monnaie utilisé
     * @param {type} String
     * @return void
     */
    public function setMoneyUnity($moneyUnity)
    {
        $this->moneyUnity = $moneyUnity;
    }

    /**
     * setter du mot de passe
     * @param {type} String
     * @return void
     */
    public function setPassword($password)
    {
        $this->password = $password;
    }

    /**
     * setter de la police des noms de groupe
     * @param {type} String
     * @return void
     */
    public function setGroupFont($groupFont)
    {
        $this->groupFont = $groupFont;
    }

    /**
     * setter de la taille de la police des noms de groupe
     * @param {type} Double
     * @return void
     */
    public function setGroupSize($groupSize)
    {
        $this->groupSize = $groupSize;
    }

    /**
     * setter de la couleur de la police des noms de groupe
     * @param {type} String
     * @return void
     */
    public function setGroupColor($groupColor)
    {
        $this->groupColor = $groupColor;
    }

    /**
     * setter de la police des noms des articles
     * @param {type} String
     * @return void
     */
    public function setArticleFont($articleFont)
    {
        $this->articleFont = $articleFont;
    }

    /**
     * setter de la taille de la police des noms des articles
     * @param {type} Double
     * @return void
     */
    public function setArticleSize($articleSize)
    {
        $this->articleSize = $articleSize;
    }

    /**
     * setter de la couleur de la police des articles
     * @param {type} String
     * @return void
     */
    public function setArticleColor($articleColor)
    {
        $this->articleColor = $articleColor;
    }

    /**
     * setter du logo 1 du menu
     * @param {type} Blob
     * @return void
     */
    public function setLogo1($logo1)
    {
        $this->logo1 = $logo1;
    }

    /**
     * setter du logo 2 du menu
     * @param {type} Blob
     * @return void
     */
    public function setLogo2($logo2)
    {
        $this->logo2 = $logo2;
    }

    /**
     * mise en forme en json des données de la config
     */
    public function toJSON()
    {
        $data = [
            'id' => $this->getId(),
            'refreshTime' => $this->getRefreshTime(),
            'moneyUnity' => $this->getMoneyUnity(),
            'password' => $this->getPassword(),
            'groupFont' => $this->getGroupFont(),
            'groupSize' => $this->getGroupSize(),
            'groupColor' => $this->getGroupColor(),
            'articleFont' => $this->getArticleFont(),
            'articleSize' => $this->getArticleSize(),
            'articleColor' => $this->getArticleColor(),
            'logo1' => $this->getLogo1(),
            'logo2' => $this->getLogo2(),
        ];
        return json_encode($data, JSON_PRETTY_PRINT);
    }
}
?>