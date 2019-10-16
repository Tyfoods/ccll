<?php
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use MyApp\Chat;

    $DIR = __DIR__;
    $DIR = str_replace('includes\server-sent-events\bin', '', $DIR);

    require $DIR . 'vendor\autoload.php';


    $server = IoServer::factory(
        new HttpServer(
            new WsServer(
                new Chat()
            )
        ),
        8080
    );

    //$server->run();

?>