#!/usr/bin/env node

const express = require('express');
const app = express();
const fs = require('fs');
const path = __dirname + '/data';
var port = 3000;

process.argv.forEach(function (val, index, array) {
  if (parseInt(val)) {
    port = parseInt(val);
  }
});

(function router() {
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.get('/', ping);
  app.get('/list', list);
  app.get('/product/:id', product);
  app.get('/images/:id', images);
  app.get('/icons/:id', icons);

  app.listen(port, () => {
    console.log(`Farm@Home Backend running at port ${port}!`);
  });
})();

function ping(req, res) {
  res.send('Farm@Home - Backend');
};

function images(req, res) {
  var imagePath = `${path}/images/${req.params.id}.png`;

  fs.readFile(imagePath, 'utf8', (err, contents) => {
    if (err) {
      res.status(404).send(`Cannot GET images/${req.params.id}`);
    }
    else {
      res.sendFile(imagePath);
    }
  });
};

function icons(req, res) {
  var imagePath = `${path}/icons/${req.params.id}.png`;

  fs.readFile(imagePath, 'utf8', (err, contents) => {
    if (err) {
      res.status(404).send(`Cannot GET icons/${req.params.id}`);
    }
    else {
      res.sendFile(imagePath);
    }
  });
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
