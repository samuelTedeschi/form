const http = require('http');
const fs = require('fs'); // Módulo para trabalhar com arquivos

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Ler e enviar o arquivo HTML para o cliente
        fs.readFile('index.html', 'utf8', (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Erro interno do servidor');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
