<?php
class Article
{
    private $id;
    private $group;
    private $page;
    private $order;
    private $color;

    /**
     * constructeur du beans boisson
     * @param {type} Integer
     * @param {type} String
     * @param {type} Integer
     * @param {type} Integer
     * @param {type} String
     */
    public function __construct($id, $group, $page, $order, $color)
    {
        $this->id = $id;
        $this->group = $group;
        $this->page = $page;
        $this->order = $order;
        $this->color = $color;
    }

    /**
     * getter de l'id du groupe
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * getter du nom du groupe
     */
    public function getGroup()
    {
        return $this->group;
    }

    /**
     * getter du numéro de la page
     */
    public function getPage()
    {
        return $this->page;
    }

    /**
     * getter de l'ordre de l'affichage du groupe
     */
    public function getOrder()
    {
        return $this->order;
    }

    /**
     * getter de la couleur de la police du nom du groupe
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * setter du nom du groupe
     * @param {type} String
     * @return void
     */
    public function setGroup($group)
    {
        $this->group = $group;
    }

    /**
     * setter du numéro de la page
     * @param {type} Integer
     * @return void
     */
    public function setPage($page)
    {
        $this->page = $page;
    }

    /**
     * setter de l'ordre d'affichage du groupe
     * @param {type} Integer
     * @return void
     */
    public function setOrder($order)
    {
        $this->order = $order;
    }

    /**
     * setter de la couleur de la police du nom du groupe
     * @param {type} String
     * @return void
     */
    public function setColor($color)
    {
        $this->color = $color;
    }

    /**
     * mise en forme en json des données du groupe
     */
    public function toJSON()
    {
        $data = [
            'id' => $this->getId(),
            'group' => $this->getGroup(),
            'page' => $this->getPage(),
            'order' => $this->getOrder(),
            'color' => $this->getColor(),
        ];
        return json_encode($data, JSON_PRETTY_PRINT);
    }
}
?>