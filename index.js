#!/usr/bin/env node

const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;
const path = __dirname + '/data';

(function router() {
  app.get('/', ping);
  app.get('/list', list);
  app.get('/product/:id', product);

  app.listen(port, () => {
    console.log(`Farm@Home Backend running at port ${port}!`);
  });
})();

function ping(req, res) {
  res.send('FAH - Backend');
};

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
