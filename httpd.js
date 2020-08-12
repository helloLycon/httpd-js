#!/usr/bin/node

const port = 8080;

const http = require('http');
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};


function helloWorld(req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}

function acceptJson(req, resp) {
  var jsonData = "";
  req.on('data', function (chunk) {
    jsonData += chunk;
  });
  req.on('end', function () {
    var reqObj = JSON.parse(jsonData);
    console.log(reqObj);
    resp.writeHead(200, { 'Content-Type': 'application/json' });
    resp.end('{"errno": 0,"cost": "20.00"}');
  });
}

const bootHttps = 1;
if(bootHttps) {
  https.createServer(options, acceptJson).listen(port);
} else {
  http.createServer(helloWorld).listen(port);
}
console.log('httpd listen on ' + port + '.');
