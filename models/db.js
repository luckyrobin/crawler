var mysql = require('mysql');

var pool  = mysql.createPool({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    port: '3306',
    database:'test'
});

pool.on('connection', function(connection) {
    connection.query('SET SESSION auto_increment_increment=1');
});

module.exports = pool;

