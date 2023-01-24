
const express = require("express");
const five = require("johnny-five");

var board = new five.Board();

const PORT = process.env.PORT || 3001;

board.on("ready", function () {

    const app = express();

    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
    });

    var led = new five.Led(12);

    app.get('/led/off', function(req, res) { // O que acontece quando alguém vai para `/led/off`
        led.off(); // Defina o pino referido pela variável 'LEDpin` 'low'(desligado)
        res.json({ message: 'Agora o LED do pino 12 deve estar Desligado.' }); // E diga ao usuário que ele deve estar desativado na página da Web
    });

    app.get("/led/on", (req, res) => {
        led.on(); // Defina o pino referido pela variável 'LEDpin` 'high'(ligado)
        res.json({ message: 'Agora o LED do pino 12 deve estar Ligado.' });
    });

    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });

});

