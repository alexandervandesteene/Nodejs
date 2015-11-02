var express = require('express');
var app = express();

var mysql = require("mysql");
var config = require("./config.json");

var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser());


app.get('/',function(request, response){
    response.render('index.ejs',{title: 'Home'})
});

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = process.env.PORT || 3000;
    console.log('Listening at http://%s:%s', host , port)
});