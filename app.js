/**
 * Created by alexandervandesteene on 19/10/15.
 */
var express = require('express');
var app = express();

var mysql = require("mysql");
var config = require("./config.json");

var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser());

var connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port : config.port,
});
connection.connect();


function getHoursCount(done){
    connection.query('SELECT at, url, HOUR(at) uur FROM logs Order BY uur',function(err,result){
        if (err) {
            done([]);   //bij error lege array teruggeven
        } else {
            var list = [];
            result.forEach(function(e) {
                list.push({date: e.at, url: e.url, uur: e.uur});
            });
            done(list);
        }
    });
}

//Alles ophalen van dit specifieke uur
function getSpecificHour(done,uur) {
    connection.query('SELECT * FROM `logs` WHERE HOUR(at) = ?',[uur], function (err, result) {
        if (err) {
            done([]);   //bij error lege array teruggeven
        } else {
            var list10 = [];
            result.forEach(function (e) {
                list10.push({ar: e.at, url: e.url});
            });
            done(list10);
        }
    })
}


app.get('/',function(request, response){
    response.render('index.ejs',{title: 'Home'})
});

app.get('/log',function(request, response){
    response.render('log.ejs',{title: 'Log'})
});

app.get('/hours',function(request, response){
    getHoursCount(function(result) {
        console.log(result);
        response.render('eachHour.ejs', {title: 'Each Hour', logs: result});
    });

});

app.post('/log', function(req, res) {
    var url = req.body.url;
    console.log("geklikt :D + " + url);
    connection.query(
        'INSERT	INTO logs (at,url)	values	(now(),?)',[url],function(err){
            res.render('error.ejs',{title: 'Error', Result: err});
        });
    res.render('log.ejs',{title: 'Log'})
});

app.get('/logs',function(request, response){
    connection.query('SELECT * FROM logs ORDER BY at DESC LIMIT 10',function(err,result){
        if(err)
        {
            response.render('error.ejs',{title: 'Error', Result: err});
        }
        else{
            response.render('logs.ejs',{title: 'Logs', Result: result});
        }
    });

});

var http = require('http')
var port = process.env.PORT || 1337;

var server = app.listen(port, function(){
    console.log('Listening at http://%s' , port)
});