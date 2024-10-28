<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
header('Content-Type: application/json; charset=utf-8');


// Conseguir metodo en base a una URL
$url = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH); //tomo la url
$aUrl = explode("/", $url); //la parseo en base a la barra.


// recupero metodo a ejecutar
$methodToExecute = $aUrl[sizeof($aUrl) - 1]; // Posiciono en la ultima ubicacion para tomar el metodo a ejecutar.

?>