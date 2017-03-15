/*module読み込み*/
var express = require('express');
var mysql = require('mysql');
var config = require('./config.js');
var url = require('url');

var app = express();

var connection = mysql.createConnection({
	host : config.db_host,
	user: config.db_user,
	password: config.db_pass,
	port: config.db_port,
	database: config.db_name
});
var data = [];
app.get('/',function(req,res){
	var clm;
	if (req.url == '/') {
		clm = '*';
	} else {
		clm = req.url.replace(/\//g,"");
	}
	console.log(clm);
	var sql = 'select * from devices;';
	connection.connect();
	var query = connection.query(sql);
	query
		.on('result', function(rows) {
			data.push(rows);	
		})
		.on('end', function() {
			res.writeHead(200, {
				'Content-Type' : 'application/json',
				'charset' : 'utf-8'
			});
			res.write(JSON.stringify(data),encoding='utf-8');
			res.end();
			connection.end();
		});
});
app.listen(config.port, config.host);
console.log('server is listening...');