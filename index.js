//TODO: no empty strings when adding
//TODO: modulize the functions
//TODO: add console logs lines for user experience
//TODO: create delete functions
//TODO: 


const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");
const chalk = require("chalk");

const connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "password",
  database: "employeesDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log(chalk.blue.bold(`==============================================================================================`));
  console.log(chalk.blue.bold(`==============================================================================================`));
  
  console.log(``);

  console.log(
    chalk.red.bold(
      figlet.textSync("Employee Tracker", {
        font: "Star Wars",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 90,
        whitespaceBreak: false,
      })
    )
  );

  console.log(
    `                                                                    ` +
      chalk.yellow.bold("Created By: James Fisher")
  );

  console.log(``);
  console.log(chalk.blue.bold(`==============================================================================================`));
  console.log(chalk.blue.bold(`==============================================================================================`));
  console.log(``);
  // asks the first set of questions using Enquirer
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
        "Exit",
      ],
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
          updateRole();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

function viewTable() {
  inquirer
    .prompt({
      name: "view_table",
      type: "list",
      message: "Which table would you like to view?",
      choices: ["Departments", "Roles", "Employees"],
    })
    .then((val) => {
      if (val.view_table === "Departments") {
        connection.query("SELECT dept_id AS Department_ID, departments.name AS Department_Name FROM departments", function (err, res) {
          if (err) throw err;
          console.log(chalk.green.bold(`====================================================================================`));
            console.log(`                              ` + chalk.red.bold(`All Departments:`));
            console.log(chalk.green.bold(`====================================================================================`));
          console.table(res);
          initialQuery();
        });
      } else if (val.view_table === "Roles") {
        let query = "SELECT roles.role_id AS Role_ID, roles.title AS Title, departments.name AS Department FROM roles INNER JOIN departments ON roles.dept_id = departments.dept_id ORDER BY roles.role_id ASC"
        connection.query(query, function (err, res) {
          if (err) throw err;
          console.log(chalk.green.bold(`====================================================================================`));
            console.log(`                              ` + chalk.red.bold(`All Roles:`));
            console.log(chalk.green.bold(`====================================================================================`));
          console.table(res);
          initialQuery();
        });
      } else if (val.view_table === "Employees") {
          let query = "SELECT emp_id AS Employee_ID, first_name AS First_Name, last_name AS Last_Name, title AS Title, salary AS Salary, departments.name AS Department FROM employees INNER JOIN roles ON employees.role_Id = roles.role_id INNER JOIN departments ON roles.dept_id = departments.dept_id ORDER BY last_name ASC"
        connection.query(query, function (err, res) {
          if (err) throw err;
          console.log(chalk.green.bold(`====================================================================================`));
            console.log(`                              ` + chalk.red.bold(`All Employees:`));
            console.log(chalk.green.bold(`====================================================================================`));
          console.table(res);
          initialQuery();
        });
      }
    });
}

function addValue() {
  inquirer
    .prompt({
      name: "add",
      type: "list",
      message: "Which would you like to add?",
      choices: ["Department", "Role", "Employee"],
    })
    .then((val) => {
      if (val.add === "Department") {
        inquirer
          .prompt({
            type: "input",
            name: "dept_add",
            message:
              "What is the name of the department you would like to add?",
          })
          .then(function (answer) {
            console.log(`You have added a ${answer.dept_add} department.`);
            connection.query(
              "INSERT INTO Departments SET ?",
              {
                name: answer.dept_add,
              },
              function (err, res) {
                if (err) throw err;
                initialQuery();
              }
            );
          });
      } else if (val.add === "Role") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "role_add",
              message: "What is the name of the role you would like to add?",
            },
            {
              type: "number",
              name: "salary",
              message: "What is the salary for the role you would like to add?",
            },
            {
              type: "number",
              name: "deptId",
              message:
                "What is the department ID for the role you would like to add?",
            },
          ])
          .then(function (answer) {
            console.log(
              `You have added the role of ${answer.role_add} with a salary of ${answer.salary}.`
            );
            connection.query(
              "INSERT INTO Roles SET ?",
              {
                title: answer.role_add,
                salary: answer.salary,
                dept_id: answer.deptId,
              },
              function (err, res) {
                if (err) throw err;
                initialQuery();
              }
            );
          });
      } else if (val.add === "Employee") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "empAddLastName",
              message:
                "What is the last name of the employee you would like to add?",
            },
            {
              type: "input",
              name: "empAddFirstName",
              message:
                "What is the first name of the employee you would like to add?",
            },
            {
              type: "number",
              name: "empAddRoleId",
              message:
                "What is the role ID of the employee you would like to add?",
            },
            {
              type: "number",
              name: "empAddMgrId",
              message:
                "What is the manager ID of the employee you would like to add?",
              default: 1,
            },
          ])
          .then(function (answer) {
            console.log(answer);

            connection.query(
              "INSERT INTO Employees SET ?",
              {
                last_name: answer.empAddLastName,
                first_name: answer.empAddFirstName,
                role_id: answer.empAddRoleId,
                manager_id: answer.empAddMgrId,
              },
              function (err, res) {
                if (err) throw err;
                initialQuery();
              }
            );
          });
      }
    });
}

function updateRole() {
    console.table()
  inquirer
    .prompt([
      {
        name: "newRole",
        type: "input",
        message:
          "What is the last name of the employee you would like to update?",
      },
    ])
    .then(function (answer) {
      var query = "SELECT * FROM Employees WHERE ?";
      connection.query(
        query,
        {
          last_name: answer.newRole,
        },
        function (err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log(chalk.green.bold(`====================================================================================`));
            console.log(`                              ` + chalk.red.bold(`Employee Information:`));
            console.log(chalk.green.bold(`====================================================================================`));
            console.table(res);
            inquirer
              .prompt({
                name: "idConfirm",
                type: "number",
                message: "Please enter the employee's ID to confirm choice:",
              })
              .then(function (answer) {
                let query = "SELECT * FROM Employees WHERE ?";
                connection.query(
                  query,
                  {
                    emp_id: answer.idConfirm,
                  },
                  function (err, res) {
                    for (let i = 0; i < res.length; i++) {
                      console.log(answer.idConfirm);
                      let newRoleVar = answer.idConfirm;
                      inquirer
                        .prompt({
                          name: "newRoleId",
                          type: "number",
                          message:
                            "Please enter the new role ID for the employee:",
                        })
                        .then(function (answer) {
                          console.log(
                            `You have changed the role of the employee.`
                          );
                          let query = `UPDATE Employees SET ? WHERE emp_id = ${newRoleVar}`;
                          connection.query(
                            query,
                            {
                              role_id: answer.newRoleId,
                            },
                            function (err, res) {
                              if (err) throw err;
                              initialQuery();
                            }
                          );
                        });
                    }
                  }
                );
              });
          }
        }
      );
    });
}
