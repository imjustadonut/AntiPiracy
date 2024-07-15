let b64 = require('base-64');
let http = require('http');
let request = require('request');
let fs = require('fs');
let path = require('path');
let url = require('url');
let express = require('express');
const { table } = require('console');

let app = express();
let port = 3080;

let configs = {};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api', (req, res) => {
  res.send('API ERR: Please use an endpoint.');
});

let endpointfolder = './endpoints/';

fs.readdir(endpointfolder, (err, files) => {
  files.forEach(file => {
    let endpoint = require(endpointfolder + file);
    app.get(endpoint.path, endpoint.endpoint_function);
    console.log(`Endpoint ${endpoint.endpoint_info.name} loaded at http://localhost:${port + endpoint.path}`);
  })
  err ? console.log(err) : null;
});

let configfolder = './config/';

fs.readdir(configfolder, (err, files) => {
  files.forEach(file => {
    fs.readFile(configfolder + file, 'utf8', (err, data) => {
      configs[file] = data;
      err ? console.log(err) : console.log(`Config file \"${file.replace('.js', '')}\" loaded.`);
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});