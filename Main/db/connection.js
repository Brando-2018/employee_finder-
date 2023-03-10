const mysql = require("mysql");

const connection = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "password",
      database: "employee_tracker",
    });

module.exports = connection;