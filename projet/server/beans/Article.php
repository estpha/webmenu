<?php
class Article
{
    private $id;
    private $description;
    private $quantity;
    private $soldout;
    private $price;
    private $color;
    private $group;
    private $order;

    /**
     * constructeur du beans boisson
     * @param {type} Integer
     * @param {type} String
     * @param {type} Boolean
     * @param {type} Double
     * @param {type} String
     * @param {type} String
     * @param {type} Integer
     */
    public function __construct($id, $description, $quantity, $soldout, $price, $color, $group, $order)
    {
        $this->id = $id;
        $this->description = $description;
        $this->quantity = $quantity;
        $this->soldout = $soldout;
        $this->price = $price;
        $this->color = $color;
        $this->group = $group;
        $this->order = $order;
    }

    /**
     * getter de la id de l'article
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * getter de la description/nom de l'article
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * getter de la quantite de l'article (volume/poids)
     */
    public function getQuantity(){
        return $this->quantity;
    }

    /**
     * getter de l'attribut soldout de l'article
     */
    public function isSoldout()
    {
        return $this->soldout;
    }

    /**
     * getter du prix de l'attribut
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * getter de la couleur de l'article
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * getter du groupe de l'article
     */
    public function getGroup()
    {
        return $this->group;
    }

    /**
     * getter de l'ordre de l'article dans le tableau afficher sur la page du menu
     */
    public function getOrder()
    {
        return $this->order;
    }

    /**
     * setter de la description/nom de l'article
     * @param {type} String
     * @return void
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * setter de la quantité de l'article (volume/poids)
     * @param {type} String
     * @return void
     */
    public function setQuantity($quantity){
        $this->quantity = $quantity;
    }

    /**
     * setter de l'attribut soldout de l'article
     * @param {type} Boolean
     * @return void
     */
    public function setSoldout($soldout)
    {
        $this->soldout = $soldout;
    }

    /**
     * setter du prix de l'article
     * @param {type} Double
     * @return void
     */
    public function setPrice($price)
    {
        $this->price = $price;
    }

    /**
     * setter de la couleur de l'article
     * @param {type} String
     * @return void
     */
    public function setColor($color)
    {
        $this->color = $color;
    }

    /**
     * setter du groupe de l'article
     * @param {type} String
     * @return void
     */
    public function setGroup($group)
    {
        $this->group = $group;
    }

    /**
     * setter de l'ordre de l'article dans la liste affiché sur la page
     * @param {type} Integer
     * @return void
     */
    public function setOrder($order)
    {
        $this->order = $order;
    }

    /**
     * mise en forme en json des données de l'article
     */
    public function toJSON()
    {
        $data = [
            'id' => $this->getId(),
            'descritpion' => $this->getDescription(),
            'quantity'=> $this->getQuantity(),
            'soldout' => $this->isSoldout(),
            'price' => $this->getPrice(),
            'color' => $this->getColor(),
            'group' => $this->getGroup(),
            'order' => $this->getOrder(),
        ];
        return json_encode($data, JSON_PRETTY_PRINT);
    }
}
?>