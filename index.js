const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;
const path = './data';

(function router() {
  app.get('/list', list);
  app.get('/product/:id', product);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
})();

function list(req, res) {
  res.setHeader('Content-Type', 'application/json');

  fs.readFile(`${path}/list.json`, 'utf8', (err, contents) => {
    res.send(contents);
  });
};

function product(req, res) {
  var productId = req.params.id;

  res.setHeader('Content-Type', 'application/json');

  fs.readFile(`${path}/product/${productId}.json`, 'utf8', (err, contents) => {
    if (err) {
      res.status(404).send(`Cannot GET product/${productId}`);
    }
    else {
      res.send(contents);
    }
  });
};
