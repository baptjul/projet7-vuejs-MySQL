var mysql = require('mysql');

const dbconfig = mysql.createConnection({
    host: 'localhost', // process.env.Db_host,
    user: 'Groupomania_user', //process.env.Db_user,
    password: 'ZUTwc5aMJhVmeMCe93hjsSH8X', //process.env.Db_password,
    database: 'groupomania' //process.env.DataBase
});

dbconfig.connect((err) => {
    if (!err) {
        console.log("Connected to data base");
    }
    console.log("Connection failed");
});

module.exports = dbconfig;

/*
Db_host = localhost
Db_user = Groupo_user
Db_password = ZUTwc5aMJhVmeMCe93hjsSH8X
DataBase = groupomania*/