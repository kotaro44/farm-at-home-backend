#!/usr/bin/env node

const request = require('ajax-request');
const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http');
const path = 'http://kotaro44.github.io/public/data';
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

function respond(res, body) {
  setTimeout(() => {
    res.send(body);
  }, Math.floor(Math.random()*3000));
};

function ping(req, res) {
  res.send('Farm@Home - Backend');
};

function images(req, res) {
  http.get(`${path}/images/${req.params.id}.png`, function(response) {
    if (response.statusCode !== 200) {
      res.status(404).send(`Cannot GET images/${req.params.id}`);
    }
    else {
      res.writeHead(response.statusCode, {
        'Content-Type': response.headers['content-type']
      });
      response.pipe(res);
    }
  });
};

function icons(req, res) {
  http.get(`${path}/icons/${req.params.id}.png`, function(response) {
    if (response.statusCode !== 200) {
      res.status(404).send(`Cannot GET icons/${req.params.id}`);
    }
    else {
      res.writeHead(response.statusCode, {
        'Content-Type': response.headers['content-type']
      });
      response.pipe(res);
    }
  });
};

function list(req, res) {
  res.setHeader('Content-Type', 'application/json');

  request({
    url: `${path}/list.json`,
    method: 'GET',
  }, function(err, response, body) {
    if (err) {
      res.status(404).send('Cannot GET list');
    }

    respond(res, body);
  });
};

function product(req, res) {
  var productId = req.params.id;

  res.setHeader('Content-Type', 'application/json');

  request({
    url: `${path}/product/${productId}.json`,
    method: 'GET',
  }, function(err, response, body) {
    if (err) {
      res.status(404).send(`Cannot GET product/${productId}`);
    }

    respond(res, body);
  });
};
