//module読み込み
var http = require('http');
var config = require('./config.js');
var mysql = require('mysql');

//変数宣言
var data = [];

//鯖起動
var server = http.createServer();
server.on('request', main);
server.listen(config.port, config.host);
console.log('server running...');

//main
function main (req, res) {
	res.writeHead(200, {
		'Content-Type' : 'application/json',
		'charset' : 'utf-8'
	});
	ConnectDb(mysql, 'select * from devices;', data, function () {
		res.write(JSON.stringify(data),encoding='utf-8');
	});
	res.end();
}


//DB接続->値取得
function ConnectDb (mysql, sql, result, afterFunction) {
	result.length = 0;
	connection = mysql.createConnection({
		host : '192.168.3.15',
		user: 'root',
		password: 'Jp(0117)',
		port: 3306,
		database: 'IoTer'
	});
	connection.connect();
	connection.query(sql, (err, rows, fields) => {
		if (err) throw err;
		result.push(rows);
	});
	connection.end();
	afterFunction();
}