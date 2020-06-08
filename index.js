var express = require('express');
var fs = require('fs'); // Módulo para leitura e gravação de arquivos (Fyle System)
var app = express();
var port = 3000;

app.use(express.json()); // Especifica que vamos tratar objetos do tipo JSON

app.get('/', (req, res) => {
  res.send('Api pronta para consumo!');
})

app.get('/account', (req, res) => {
  fs.readFile('accounts.json', 'utf8', (err, data) => {

    if (!err) {
      let json = JSON.parse(data);
      delete json.nextId;
      res.send(json);
    } else {
      res.status(400).send({ error: err.message });
    }
  });
});

app.post('/account', (req, res) => {
  let account = req.body;
  // console.log('Parou aqui'); //breakpoint - mostra todos os métodos do req, res(requisições, headers)
  console.log("Post Account!");


  // Lendo o arquivo JSON
  fs.readFile('accounts.json', 'utf8', (err, data) => {
    if (!err) {
      try {
        let json = JSON.parse(data);
        account = { id: json.nextId++, ...account };
        json.accounts.push(account);

        fs.writeFile('accounts.json', JSON.stringify(json), err => {
          if (err) {
            res.status(400).send({ error: err.message });
          } else {
            res.end();
          }
        });

      } catch (err) {
        res.status(400).send({ error: err.message });
      }
    } else {
      console.log('Erro na leitura');
      res.status(400).send({ error: err.message });
    }
  });

  // Criando o arquivo accounts.json e preenchendo com os valores do método post
  // writeFile cria um novo arquivo e sobrescreve o antigo
  /* appendFile concatena a nova requisição ao json antigo (não sobrescreve) - 
  Necessita uma abordagem para o correto armazenamento da listagemdos dados */
  // fs.appendFile('accounts.json', JSON.stringify(params), err => {
  //   console.log(err);
  // })

  // res.send(`Nome: ${params.name} Idade: ${params.age}`); // Retorno dos valores contidos no body
  // res.send('Post account')
})


app.listen(port, () => {
  // Leitura do arquivo
  try {
    fs.readFile('accounts.json', 'utf8', (err, data) => {
      // Se não existir, cria o arquivo com a estrutura do JSON
      if (err) {
        const initialJson = {
          nextId: 1,
          accounts: []
        };
        // Se existir, faz escrita
        fs.writeFile('accounts.json', JSON.stringify(initialJson), (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  } catch (error) {
    console.log(err);
  }

  console.log("API started!");
})