var mysql = require('mysql');
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'yhg331228',
    database : 'account',
    multipleStatements: true
});
db.connect();
module.exports = db;
