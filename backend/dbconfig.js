var mysql = require('mysql');

const dbconfig = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.BDPASSWORD,
    database: process.env.DATABASE
});

dbconfig.connect((err, test) => {
    if (!err) {
        console.log("Connected to data base");
    } else {
        console.log("Connection failed");
    }
});

module.exports = dbconfig;
