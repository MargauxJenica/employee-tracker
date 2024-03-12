const { rejects } = require('assert');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootUser',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`) // checking connection
);

// INQUIRER PROMPTS AND CALL TO FUNCTION
const mainMenu = async () => {
    console.log("\n\n");

    try {
        const answer = await inquirer.prompt([{
            type: 'list',
            name: 'main_menu',
            message: 'What would you like to do?\n',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add New Department',
                'Add New Role',
                'Add New Employee',
                'Update an Employee',
            ]
        }]);

        switch (answer.main_menu) {
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
                await addEmployee();
                break;
            case "Update an Employee":
                await updateEmployee();
                break;
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
 
// VIEW ALL DEPARTMENTS
const allDepartments = () => {
     
    console.log("\n");
     
    db.query('SELECT * FROM department', function (err, data) {
        if (err) {
            console.error("Error fetching departments: ", err);
           } else {
            console.table(data);

            mainMenu();
           }
    });
};

// VIEW ALL ROLES
const allRoles = () => {

    console.log("\n");

    db.query('SELECT * FROM roles', function (err, data) {
       if (err) {
        console.error("Error fetching roles: ", err);
       } else {
        console.table(data);
        
        mainMenu();
       }
    });

};

 // VIEW ALL EMPLOYEES
const allEmployees = () => {

    console.log("\n");

    db.query('SELECT * FROM employee', function (err, data) {
        if (err) {
            console.error("Error fetching employees: ", err);
           } else {
            console.table(data);
            
            mainMenu();
           }
    });

 };

 // ADD NEW DEPARTMENT
 const addDepartment = () => {

    console.log("Adding a Department\n");

    inquirer.prompt([
        {
            type: 'input',
            name: 'addDepartment',
            message: 'What is the name of the new department?',
        }
    ]).then((answer) => { // take  answer and input into department 

        const sql = `INSERT INTO department (name) VALUES (?)`;
        const params = [answer.addDepartment];

        db.query(sql, params, (err, rows) => {
            if (err) {
                console.error({ error: err.message });
                return;
            }
            console.log(`\nAdded new department ${answer.addDepartment}`);

            mainMenu();
        });
    });    
    
 };

// ADD NEW ROLE
const addRole = () => {

    console.log("Adding a Role\n");

    db.query('SELECT * FROM department', (err, departments) => { // initiates database query from department table

        const departmentList = departments.map(department => department.name);
    
        inquirer.prompt([
            {
                type: "input",
                message: "What is the title of the role?",
                name: "role_title"
            },
            {
                type: "input",
                message: "What is the salary for this role? (ex: 90000)",
                name: "salary"
            },
            {
                type: "list",
                message: "What department is this role in?",
                name: "role_dept",
                choices: departmentList
            }
            
        ]).then(answer => {

            const selectedDepartment = departments.find(department => department.name === answer.role_dept);

            db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${answer.role_title}", ${answer.salary}, ${selectedDepartment.id})`, (err, data) => {
                console.log(`\nNew role created: ${answer.role_title} with a salary of $ ${answer.salary}`);
                
                mainMenu();
            });
        });
    });
    

 };

// ADD NEW EMPLOYEE
 const addEmployee = async () => {

    // get roles
    const roles = await getRoles();

    //get employees
    const managers = await getEmployees();

    inquirer.prompt([
            {
                type: 'input',
                message: "What is the employee's first name?",
                name: 'employee_first',
            },
            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'employee_last',
            },
            {
                type: 'list',
                message: "What is the employee's role?",
                name: 'employee_role',
                choices: roles,
            },
            {
                type: 'list',
                message: "Who is the employee's Manager?",
                name: 'employee_manager',
                choices: managers,
            },
        ]).then(answer => {
            // console.log("Answer:", answer);
            // console.log("Managers:", managers);
            const selectedRole = roles.find(role => role.value === answer.employee_role);
            const selectedManager = managers.find(manager => manager.value === answer.employee_manager);
            // console.log("Selected Role:", selectedRole);
            // console.log("Selected Manager:", selectedManager);

            db.query(`INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ("${answer.employee_first}", "${answer.employee_last}", ${selectedRole.value}, ${selectedManager.value})`,
                (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log('New employee added');
                    mainMenu();
                });
        });
};

// UPDATE AN EMPLOYEE
const updateEmployee = async () => {
    // get all roles 
    const roles = await getRoles();
    // get all the employees
    const employees = await getEmployees();

    inquirer
        .prompt([
            {
                type: 'list',
                message: "Which employee's role do you want to update?",
                name: 'selected_employee',
                choices: employees,
            },
        ]).then(employeeAnswer => {
            const selectedEmployeeId = employeeAnswer.selected_employee;

            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Select the new role:',
                    name: 'new_role',
                    choices: roles,
                },
            ]).then(roleAnswer => {
                const newRoleId = roleAnswer.new_role;

                db.query(`UPDATE employee SET roles_id = ${newRoleId} WHERE id = ${selectedEmployeeId}`, (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log('Employee role updated');
                    mainMenu();
                });
            });
        });
};

// get list of roles
const getRoles = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM roles', (err, roles) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const roleList = roles.map(role => ({
                    name: role.title,
                    value: role.id, 
                }));
                resolve(roleList);
            }
        });
    });
};

// get list of employees
const getEmployees = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM employee', (err, employees) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const employeeList = employees.map(employee => ({
                    name: `${employee.last_name}, ${employee.first_name}`,
                    value: employee.id, 
                }));
                resolve(employeeList);
            }
        });
    });
};


// call to open main menu
mainMenu();
