<?php

class CategoriaModel{

    /**
     * Devuelve un listado de todas las categorias
     *
     * @return array|null
     **/
    public static function getAll()
    {
        $response = null;
        $sql = "select * from categorias";

        $db = new Database();

        if($db->getConnectionStatus()){
            $response = $db->getQuery($sql);

            return $response;
        }

    }

    /**
     * Obtener una categoria especifica
     *
     * @param Int $id Id de la categoria
     * @return Array|null
     **/
    public function getById($id){
        $response = null;
        $sql = "select * from categorias where id_categoria = ". $id;

        $db = new Database();

        if($db->getConnectionStatus()){
            $response = $db->getQuery($sql);

            return $response;
        }
    }
}