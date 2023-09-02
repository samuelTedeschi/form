const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
    console.log('Servidor Express rodando na porta 3000');
});