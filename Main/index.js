const inquirer = require('inquirer');
require('console.table');
const db = require('./db/connection');

// const mysql = require("mysql");

// Function to start the application and present options
function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;

        case "View all roles":
          viewRoles();
          break;

        case "View all employees":
          viewEmployees();
          break;

        case "Add a department":
          addDepartment();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "Update an employee role":
          updateEmployeeRole();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

// Function to view all departments
function viewDepartments() {
  const query = "SELECT id, name FROM department";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// Function to view all roles
function viewRoles() {
  const query =
    "SELECT roles.id, roles.title, department.name AS department, roles.salary FROM roles JOIN department ON roles.department_id = department.id";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// Function to view all employees
function viewEmployees() {
  const query =
    "SELECT employee.id, employee.first_name, employee.last_name, roles.title AS job_title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "What is the name of the department?"
    })
    .then(function(answer) {
      const query = "INSERT INTO department SET ?";
      connection.query(query, { name: answer.name }, function(err, res) {
        if (err) throw err;
        console.log("Department added!");
        start();
      });
    });
}

// function to add a role to the database
async function addRole() {
  const name = prompt('Enter the name of the new role:');
  const salary = prompt('Enter the salary for the new role:');
  const department_id = prompt('Enter the department ID for the new role:');
  
  const [rows, fields] = await pool.execute(
    'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
    [name, salary, department_id]
  );
  
  console.log(`New role ${name} added to the database.`);
}

// function to add an employee to the database
async function addEmployee() {
  const first_name = prompt('Enter the employee\'s first name:');
  const last_name = prompt('Enter the employee\'s last name:');
  const role_id = prompt('Enter the employee\'s role ID:');
  const manager_id = prompt('Enter the employee\'s manager ID:');
  
  const [rows, fields] = await pool.execute(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
    [first_name, last_name, role_id, manager_id]
  );
  
  console.log(`New employee ${first_name} ${last_name} added to the database.`);
}

// function to update an employee's role in the database
async function updateEmployeeRole() {
  const [employees] = await pool.query('SELECT * FROM employee');
  const employee = prompt('Select an employee to update:\n' + employees.map(e => `${e.id}: ${e.first_name} ${e.last_name}`).join('\n'));
  
  const new_role_id = prompt('Enter the new role ID:');
  
  const [rows, fields] = await pool.execute(
    'UPDATE employee SET role_id = ? WHERE id = ?',
    [new_role_id, employee]
  );
  
  console.log(`Employee ${employee} updated with new role ID ${new_role_id}.`);
}

start()
