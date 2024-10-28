<?php


class clientModel{
  
    public static function get($xFilters){
        $aFilters = json_decode($xFilters, true); //devuelvo un array asociativo.
        $aResponse = [];
        
        $sql = "SELECT * 
                FROM clientes";
        
        if (!empty($aFilters)) { // verifico si hay filtros 
            $count=1;
            $sql .= " WHERE ";
            foreach ($aFilters as $filter => $value) {
                $sql .= "$filter='$value'";
                if($count < count($aFilters)){ //count($var) me devuelve la cantidad de filtros en el array.
                    $sql .= " AND ";
                } 
            $count++;                  
            }
        }  
    
        $sql .= ' ORDER BY id_cliente ASC'  ;

        //--- Creo el obj de tipo bd y compruebo conexion exitosa.
        $objDB = new DataBase();
        if(!$objDB ->  getConnectionStatus()){
            $aResponse["status"] = "ERROR";
            $aResponse["message"] = $objDB -> getErrorMessage();
            return $aResponse;
        }

        // manejo de errores.
        $result = $objDB->getQuery($sql);
        
        

        if($result == null){
            $aResponse["status"] = "ERROR";
            $aResponse["message"] = $objDB->getErrorMessage();
        }else{
                $aResponse["status"] = "SUCCESS"; //conexion exitosa.
                $aResponse["message"] = "SEARCH WAS SUCCESSFULLY";
                $aResponse["data"] = $result; // Hago la sentencia sql.
        }
        
        $objDB->close(); // cierro la base de datos.

        
        return $aResponse;
    }   


    //------ xDatos va a ser un "Array asociativo"
    public static function insertClient($xFilters){
        $aFilter = json_decode($xFilters, true); // leo los parametros a insertar, como un array asoc.
        $vRazon_social = $aFilter['razon_social'];
        $vDireccion = $aFilter['direccion'];
        $vHabilitado = $aFilter['habilitado'];

        $aResponse = [];

        //---- Verifico el metodo con que se consume.
        if (strcmp($_SERVER["REQUEST_METHOD"], "POST") != 0){
            $aResponse["status"] = "Error en la solicitud";
            $aResponse["message"] = "Metodo no soportado";
            echo json_encode($aResponse);
            exit();
        }
        
        //--- Llamo al SP con la sentencia sql.
        $sql = "CALL clientes_insert('". $vRazon_social ." ',' ". $vDireccion . " ',' ". $vHabilitado ."')";

        //--- creo obj de tipo DB
        $objDB = new DataBase();
        //-- Mensaje de error.
        if(!$objDB ->  getConnectionStatus()){
            $aResponse["status"] = "ERROR";
            $aResponse["message"] = $objDB -> getErrorMessage();
            return $aResponse;
        }

        $aResponse["status"] = "SUCCESS";
        $aResponse["message"] = "CLIENT WAS INSERTED SUCCESSFULLY";
        $aResponse["data"] = $objDB->getQuery($sql);
       
        $objDB->close(); // cierro la base de datos.
        return $aResponse;
    }

    //------ xDatos va a ser un "Array asociativo"
    public static function updateClient($xFilters){
        $aFilter = json_decode($xFilters, true); // leo los parametros a insertar, como un array asoc.
        $vIdCliente = $aFilter['id_cliente'];
        $vRazon_social = $aFilter['razon_social'];
        $vDireccion = $aFilter['direccion'];
        $vHabilitado = $aFilter['habilitado'];
        $aResponse = [];
        
        //--- Llamo al SP. si sale mal, imprimira un mensaje de error dentro y lo pasará.
        $sql = "CALL clientes_update('". $vIdCliente ." ',' ". $vRazon_social ." ',' ". $vDireccion . " ',' ". $vHabilitado ."')";

        //--- creo obj de tipo DB
        $objDB = new DataBase();
        //-- Mensaje de error.
        if(!$objDB ->  getConnectionStatus()){
            $aResponse["status"] = "ERROR";
            $aResponse["message"] = $objDB -> getErrorMessage();
            return $aResponse;
        }

        // Manejar caso de error en la consulta
        $result = $objDB->execute($sql);

        if ($result === false) {  
            $aResponse["status"] = "ERROR";
            $aResponse["message"] = "Error al ejecutar la consulta SQL";
        } else {
            // Procesar datos de éxito
            $aResponse["status"] = "SUCCESS";
            $aResponse["message"] = "CLIENT WAS UPDATED SUCCESSFULLY";
            $aResponse["data"] = $objDB->getQuery($sql);
        }

        $objDB->close(); // cierro la base de datos.
        return $aResponse;
    }

    
    public static function deleteClient($xFilters){
        $aFilter = json_decode($xFilters, true);
        $vIdCliente = $aFilter['id_cliente']; // encuentro el id.

        $aResponse = [];

        //--- Llamo al SP y le asigno el id.
        $sql = "CALL clientes_delete(" . $vIdCliente . ")";

        $objDB = new DataBase();

        //--- msj de error.
        if(!$objDB->getConnectionStatus()){
            $aResponse["status"] = "ERROR";
            $aResponse["message"] = $objDB->getErrorMessage();
            return $aResponse;
        }

        // Manejar caso de error en la consulta
        $result = $objDB->execute($sql);

        if ($result === false) {  
            $aResponse["status"] = "ERROR";
            $aResponse["message"] = "Error al ejecutar la consulta SQL";
        } else {
            // Procesar datos de éxito
            $aResponse["status"] = "SUCCESS";
            $aResponse["message"] = "CLIENT WAS DELETED SUCCESSFULLY";
            $aResponse["data"] = $objDB->getQuery($sql);
        }

        $objDB->close();
        return $aResponse;
    }
}



