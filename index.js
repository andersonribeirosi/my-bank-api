var express = require('express');
var fs = require('fs'); // Módulo para leitura e gravação de arquivos (Fyle System)
var app = express();
var port = 3000;

app.use(express.json()); // Especifica que vamos tratar objetos do tipo JSON

app.get('/', (req, res) => {
  res.send('Api pronta para consumo!');
})

app.post('/account', (req, res) => {
  let params = req.body;
  // console.log('Parou aqui'); //breakpoint - mostra todos os métodos do req, res(requisições, headers)
  res.send(`Nome: ${params.name} Idade: ${params.age}`); // Retorno dos valores contidos no body

  // Criando o arquivo accounts.json e preenchendo com os valores do método post
  // writeFile cria um novo arquivo e sobrescreve o antigo
  fs.writeFile('accounts.json', JSON.stringify(params), err => {
    console.log(err);

  })
})

app.listen(port, () => {
  console.log("API started!");
})