require("dotenv").config();

const config = {
    host: process.env.Db_host,
    user: process.env.Db_user,
    password: process.env.Db_password,
    database: process.env.DataBase
    //port :
};

module.exports = dbconfig;