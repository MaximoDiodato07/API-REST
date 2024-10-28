<?php
class articleModel {

    public static function getAll($xfilter = "") {
        $aFilter = json_decode($xfilter, true);
        $aResponse = [];
        
        $sql = "SELECT a.*,
                       c.descripcion as categoria_descripcion
                FROM articulos as a
                INNER JOIN 
                    categorias as c ON c.idcategoria = a.idcategoria";
        # Agrego el innerJoin, para traer tambien el nombre de la categoria (descripcion)
        # Alias "categoria_descripcion" es para no sobreescribir descripcion de articulos

        $sql .= " ORDER BY a.idarticulo ASC";
        if (($aFilter != "") && strcmp($aFilter["filter"], "") != 0) 
            $sql .= " WHERE " . $aFilter["filter"] . " ";

       
        $objDB = new DataBase();

        if (!$objDB->getConnectionStatus()) {
            $aResponse["status"] = "ERROR";
            $aResponse["message"] = $objDB -> getErrorMessage();
            return $aResponse;
        }
        
       
        $aResponse["status"] = "success";
        $aResponse["message"] = "";
        $aResponse["data"] = $objDB->getQuery($sql);
        $objDB->close();
        return $aResponse;
    }

    public static function insertArticle($xDatos) {
        $aDatos = json_decode($xDatos, true);
        $aResponse = [];
        $sql = "CALL insertArticle('".$aDatos["id_categoria"]."' , '". $aDatos["codigo"]. "', '". $aDatos["descripcion"]. "', '". $aDatos["descripcion_larga"]. "', '". $aDatos["precio"]. "', '". $aDatos["alicuota_iva"]. "', ". $aDatos["habilitado"]. ")";
        $objDB = new DataBase();

        
        if (!isset($aDatos["id_categoria"])) {
            $aResponse["status"] = "VALID_ERROR";
            $aResponse["message"] = "Falta el id de la categoria";
            return $aResponse;
        }

        if (!isset($aDatos["codigo"])) {
            $aResponse["status"] = "VALID_ERROR";
            $aResponse["message"] = "Falta el codigo del articulo";
            return $aResponse;
        }
        
        if (!isset($aDatos["precio"])) {
            $aResponse["status"] = "VALID_ERROR";
            $aResponse["message"] = "Falta el precio del articulo";
            return $aResponse;
        }

        if (!isset($aDatos["habilitado"])) {
            $aResponse["status"] = "VALID_ERROR";
            $aResponse["message"] = "Falta la habilitacion del articulo";
            return $aResponse;
        }

        if (!$objDB->getConnectionStatus()) {
            $aResponse["status"] = "ERROR";
            $aResponse["message"] = $objDB -> getErrorMessage();
            return $aResponse;
        }
        
        $aResponse["status"] = "success";
        $aResponse["message"] = "El artículo se ingresó correctamente";
        $aResponse["data"] = $objDB->execute($sql);
        $objDB->close();
        return $aResponse;
    }

    public static function updateArticle($xDatos) {
        $aDatos = json_decode($xDatos,true);
        $aResponse = [];
        $sql = "CALL updateArticle('". $aDatos["id_articulo"]. "', '". $aDatos["id_categoria"]. "', '". $aDatos["codigo"]. "', '". $aDatos["descripcion"]. "', '". $aDatos["descripcion_larga"]. "', '". $aDatos["precio"]. "', '". $aDatos["alicuota_iva"]. "', ". $aDatos["habilitado"]. ")";
        $objDB = new DataBase();

        if (!isset($aDatos["id_categoria"])) {
            $aResponse["status"] = "VALID_ERROR";
            $aResponse["message"] = "Falta el id de la categoria";
            return $aResponse;
        }

        if (!isset($aDatos["codigo"])) {
            $aResponse["status"] = "VALID_ERROR";
            $aResponse["message"] = "Falta el codigo del articulo";
            return $aResponse;
        }
        
        if (!isset($aDatos["precio"])) {
            $aResponse["status"] = "VALID_ERROR";
            $aResponse["message"] = "Falta el precio del articulo";
            return $aResponse;
        }

        if (!isset($aDatos["habilitado"])) {
            $aResponse["status"] = "VALID_ERROR";
            $aResponse["message"] = "Falta la habilitacion del articulo";
            return $aResponse;
        }

        if (!isset($aDatos["descripcion"])) {
            $aResponse["status"] = "VALID_ERROR";
            $aResponse["message"] = "Falta la descripcion del articulo";
            return $aResponse;
        }

        if (!$objDB->getConnectionStatus()) {
            $aResponse["status"] = "ERROR";
            $aResponse["message"] = $objDB -> getErrorMessage();
            return $aResponse;
        }
        
        $aResponse["status"] = "success";
        $aResponse["message"] = "El artículo se actualizó correctamente";
        $aResponse["data"] = $objDB->execute($sql);
        $objDB->close();
        return $aResponse;
    }

    public static function deleteArticle($xDatos) {
        $aArticulo = json_decode($xDatos, true);
        $aResponse = [];
        $sql = "CALL deleteArticle( ". $aArticulo["id_articulo"]. " )";
        $objDB = new DataBase();

        if (!$objDB->getConnectionStatus()) {
            $aResponse["status"] = "ERROR";
            $aResponse["message"] = $objDB -> getErrorMessage();
            return $aResponse;
        }
        
        $aResponse["status"] = "success";
        $aResponse["message"] = "El artículo se eliminó correctamente";
        $aResponse["data"] = $objDB->execute($sql);
        $objDB->close();
        return $aResponse;
    }
}
?>