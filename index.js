const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootUser',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

 const mainMenu = () => {
    console.log("\n\n"); // creating new line for readability 
    
    // prompt user choice list
    inquirer.prompt([{
        type: 'list',
        name: 'main-menu',
        message: 'What would you like to do? ',
        choices: [
            'View All Departments', 
            'View All Roles', 
            'View All Employees', 
            'Add New Department', 
            'Add New Role', 
            'Add New Employee', 
            'Update an Employee'
        ]
    }]).then(answer => {
        switch (answers.main_menu) {
            case "View All Departments":
                allDepartments();
                break;
            case "View All Roles":
                allRoles();
                break;
            case "View All Employees":
                allEmployees();
                break;
            case "Add New Department":
                addDepartment();
                break;
            case "Add New Role":
                addRole();
                break;
            case "Add New Employee":
                addEmployee();
                break;
            case "Update an Employee":
                updateEmployee();
                break;
        }
    })
 };
 
 const allDepartments = () => {
    console.log("\n Viewing All Departments");
    
 }

 const addDepartment = () => {
    console.log("\n Adding a Department");
 }

 const allRoles = () => {
    console.log("\n Viewing All Roles");
 }

 const addRole = () => {
    console.log("\n Adding a Role");
 }

 const allEmployees = () => {
    console.log("\n Viewing All Employees");
 }

 const addEmployee = () => {
    console.log("\n Adding an Employee");
 }

 const updateEmployee = () => {
    console.log("\n Updating an Employee");
    
 }

mainMenu();