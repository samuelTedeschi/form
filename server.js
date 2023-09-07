const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

require('dotenv').config();
const emailService = process.env.EMAIL_SERVICE;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;


const server = express();

// Configurar o body-parser para lidar com dados do formulário
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get('/public', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Rota para processar o envio do formulário
server.post('/enviar', (req, res) => {
    const { nome, email, mensagem } = req.body;

    // Configurar o transporte de email com Nodemailer
    const transporter = nodemailer.createTransport({
        service: emailService,
        auth: {
          user: emailUser,
          pass: emailPass,
        },
    });

    const mailOptions = {
        from: 'seu_email',
        to: email,
        subject: 'Obrigado por preencher o formulário',
        text: `Olá ${nome},\n\nAgradecemos por preencher o formulário. Sua mensagem foi: ${mensagem}`,
    };

    // Enviar o email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erro ao enviar o email.');
        } else {
            console.log('Email enviado: ' + info.response);
            res.status(200).send('Email enviado com sucesso.');
        }
    });
});


server.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, () => {
    console.log('Servidor Express rodando na porta 3000');
});