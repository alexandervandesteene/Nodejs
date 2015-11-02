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

app.set('port',process.env.PORT || 3000);

var server = app.listen(app.get('port'), function(){
    var host = server.address().address;
    console.log('Listening at http://%s:%s', host , port)
});