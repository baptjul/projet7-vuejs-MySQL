var mysql = require('mysql');
require("dotenv").config();

const dbconfig = mysql.createConnection({
    host: process.env.Db_host,
    user: process.env.Db_user,
    password: process.env.Db_password,
    database: process.env.DataBase
});

module.exports = dbconfig;