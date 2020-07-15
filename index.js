var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employeesDB"
});

connection.connect(function (err) {
    if (err) throw err;
    initialQuery();
});


function initialQuery() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View department, roles or employees",
                "Add department, roles or employees",
                "Update employee role",
                "Update employee manager",
                "Delete departments, roles or employees",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View department, roles or employees":
                    viewTable();
                    break;

                case "Add department, roles or employees":
                    addValue();
                    break;

                case "Update employee role":
                    rangeSearch();
                    break;

                case "Update employee manager":
                    songSearch();
                    break;

                case "Delete departments, roles or employees":
                    songAndAlbumSearch();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function viewTable() {
    inquirer.prompt({
        name: "view_table",
        type: "list",
        message: "Which table would you like to view?",
        choices: ["Departments", "Roles", "Employees"]
    }).then(val => {
        if (val.view_table === "Departments") {
            connection.query("SELECT * FROM Departments", function (err, res) {
                if (err) throw err;
                console.table(res)
                initialQuery();
            });
        } else if (val.view_table === "Roles") {
            connection.query("SELECT * FROM Roles", function (err, res) {
                if (err) throw err;
                console.table(res)
                initialQuery();
            });
        } else if (val.view_table === "Employees") {
            connection.query("SELECT * FROM Employees", function (err, res) {
                if (err) throw err;
                console.table(res)
                initialQuery();
            });
        }
    })
}

function addValue() {
    inquirer.prompt({
        name: "add",
        type: "list",
        message: "Which would you like to add?",
        choices: ["Department", "Role", "Employee"]
    }).then(val => {
        if (val.add === "Department") {
            inquirer.prompt({
                type: "input",
                name: "dept_add",
                message: "What is the name of the department you would like to add?"
            }).then(function (answer) {
                console.log(`You have added a ${answer.dept_add} department.`);
                connection.query("INSERT INTO Departments SET ?", {
                        name: answer.dept_add,
                    },
                    function (err, res) {
                        if (err) throw err;
                        initialQuery();
                    }
                )
            });
        } else if (val.add === "Role") {
            inquirer.prompt([{
                        type: "input",
                        name: "role_add",
                        message: "What is the name of the role you would like to add?"
                    },
                    {
                        type: "number",
                        name: "salary",
                        message: "What is the salary for the role you would like to add?"
                    },
                    {
                        type: "number",
                        name: "deptId",
                        message: "What is the department ID for the role you would like to add?"
                    }
                ])
                .then(function (answer) {
                    console.log(`You have added the role of ${answer.role_add}.`);
                    connection.query("INSERT INTO Roles SET ?", {
                            title: answer.role_add,
                            salary: answer.salary,
                            dept_id: answer.deptId
                        },
                        function (err, res) {
                            if (err) throw err;
                            initialQuery();
                        }
                    )
                });
        } else if (val.add === "Employee") {
            inquirer.prompt([{
                        type: "input",
                        name: "empAddLastName",
                        message: "What is the last name of the employee you would like to add?"
                    },
                    {
                        type: "input",
                        name: "empAddFirstName",
                        message: "What is the first name of the employee you would like to add?"
                    },
                    {
                        type: "number",
                        name: "empAddRoleId",
                        message: "What is the role ID of the employee you would like to add?"
                    },
                    {
                        type: "number",
                        name: "empAddMgrId",
                        message: "What is the manager ID of the employee you would like to add?"
                    }
                ])
                .then(function (answer) {
                    console.log(`You have added a employee named ${answer.empAddFirstName} ${answer.empAddLastName}.`);
                    connection.query("INSERT INTO Employees SET ?", {
                            last_name: answer.empAddLastName,
                            first_name: answer.empAddFirstName,
                            role_id: answer.empAddRoleId,
                            manager_id: answer.empAddMgrId
                        },
                        function (err, res) {
                            if (err) throw err;
                            initialQuery();
                        }
                    )
                });
        }
    })
}