// Importação do módulo HTTP
const http = require('http');

// Configuração do servidor HTTP
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Funcionou\n');
});

// Definição da porta onde o servidor irá escutar
const port = 3000;

// Inicialização do servidor para escutar a porta especificada
server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/`);
});
