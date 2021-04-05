const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const WebSocket = require('ws')

const server = http.createServer(app);
const socket = new WebSocket('wss://ws.finnhub.io?token=budo2rv48v6spq9og4p0');


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});





const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})