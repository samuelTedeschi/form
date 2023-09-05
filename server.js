const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const server = express();

// Configurar o body-parser para lidar com dados do formulário
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, () => {
    console.log('Servidor Express rodando na porta 3000');
});