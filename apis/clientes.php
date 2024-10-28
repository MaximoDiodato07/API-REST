<?php
    include "../autoload.php";

    $objModel = new clientModel(); //creo un objeto de model

    $data = file_get_contents("php://input"); // leo parametros.
    
    $response = $objModel->{$methodToExecute}($data);
    echo json_encode($response);

?>