var express = require('express');
var app = express();
var port = 3000;

app.get('/', (req, res) => {
  res.send('Api pronta para consumo!');
})

app.post('/account', (req, res) => {
  console.log('Parou aqui'); //breakpoint - mostra todos os métodos do req, res(requisições, headers)
})

app.listen(port, () => {
  console.log("API started!");
})