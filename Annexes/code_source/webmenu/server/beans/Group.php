<?php
class Group
{
    private $id;
    private $name;
    private $page;
    private $order;
    private $color;

    /**
     * constructeur du beans group
     * @param {type} Integer
     * @param {type} String
     */
    public function __construct($id, $name)
    {
        $this->id = $id;
        $this->name = $name;
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
    public function getName()
    {
        return $this->name;
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
    public function setName($name)
    {
        $this->name = $name;
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
        return  [
            'id' => $this->getId(),
            'name' => $this->getName()
        ];
    }
}
?>