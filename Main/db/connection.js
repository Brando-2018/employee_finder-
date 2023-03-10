const mysql = require("mysql");

const connection = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "Password",
      database: "employee_tracker",
    });

module.exports = connection;