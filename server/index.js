/* eslint-disable handle-callback-err */
require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const app = express();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const fetch = require('node-fetch');

app.use(staticMiddleware);
app.use(express.json());

app.get('/api/city', (req, res) => {
  const data = db.get('city').value();
  res.json(data);
});

app.get('/api/user', (req, res) => {
  const data = db.get('user').value();
  res.json(data);
});

app.get('/api/yelp/businesses/search/:query', (req, res) => {
  const queryUrl = 'https://api.yelp.com/v3/businesses/search?' + req.params.query;

  fetch(queryUrl, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer 9HcPGXUHzz5uL3aILr3VUEa1tJan5EDWc8KHQEsHNm-0BP5YnEgjRaH3letAt5mW7d1xkEiTYaQy1nnZ3aHXXBTpNCiATlesAI5ulAvYzdkSxSFv_iilb2Jnhr1rXnYx'
    }
  })
    .then(response => response.json())
    .then(data => {
      res.status(200).json(data);
    });
});

app.get('/api/yelp/businesses/:id', (req, res) => {
  const queryUrl = 'https://api.yelp.com/v3/businesses/' + req.params.id;

  fetch(queryUrl, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer 9HcPGXUHzz5uL3aILr3VUEa1tJan5EDWc8KHQEsHNm-0BP5YnEgjRaH3letAt5mW7d1xkEiTYaQy1nnZ3aHXXBTpNCiATlesAI5ulAvYzdkSxSFv_iilb2Jnhr1rXnYx'
    }
  })
    .then(response => response.json())
    .then(data => {
      res.status(200).json(data);
    });
});

app.listen(process.env.PORT, () => {});
