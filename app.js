var express = require('express');
var app = express();

var mysql = require("mysql");
var config = require("./config.json");

var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser());


var http = require('http')
var port = process.env.PORT || 1337;
http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(port);