// npm packages set as variables

const inquirer = require("inquirer");
const figlet = require("figlet");
const chalk = require("chalk");

// modules set as variables
const {connection} = require('./config/connection');

// function that runs upon starting the file
connection.connect((err) => {
  if (err) throw err;
  console.log(chalk.blue.bold(`==============================================================================================`));
  console.log(chalk.blue.bold(`==============================================================================================`));
  
  console.log(``);
  // Creates title using Figlet package
  console.log(chalk.red.bold(figlet.textSync("Employee Tracker", {
        font: "Star Wars",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 90,
        whitespaceBreak: false,
      })
    )
  );

  console.log(`                                                                    ` + chalk.yellow.bold("Created By: James Fisher"));

  console.log(``);
  console.log(chalk.blue.bold(`==============================================================================================`));
  console.log(chalk.blue.bold(`==============================================================================================`));
  console.log(``);
  // asks the first set of questions using Enquirer
  initialQuery();
});

// Asks the user if they would like to view, add or update data
initialQuery = () => {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View department, roles or employees",
        "Add department, roles or employees",
        "Update employee role",
        "Remove employee",
        "View department budgets",
        "Exit",
      ],
    })
    .then((answer) => {
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

        case "Remove employee":
            removeEmp();
            break;

        case "View department budgets":
            viewBudget();
            break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

viewTable = () => {
  inquirer
    .prompt({
      name: "view_table",
      type: "list",
      message: "Which table would you like to view?",
      choices: ["Departments", "Roles", "Employees"],
    })
    .then((val) => {
      if (val.view_table === "Departments") {
        connection.query(`SELECT dept_id AS Department_ID, departments.name AS Department_Name FROM departments`, (err, res) => {
          if (err) throw err;
          console.log(chalk.green.bold(`====================================================================================`));
            console.log(`                              ` + chalk.red.bold(`All Departments:`));
            console.table(res);
            console.log(chalk.green.bold(`====================================================================================`));
          
          initialQuery();
        });
      } else if (val.view_table === "Roles") {
        const query = `SELECT roles.role_id AS Role_ID, roles.title AS Title, departments.name AS Department FROM roles 
        INNER JOIN departments ON roles.dept_id = departments.dept_id 
        ORDER BY roles.role_id ASC`
        connection.query(query, (err, res) => {
          if (err) throw err;
          console.log(chalk.green.bold(`====================================================================================`));
          console.log(`                              ` + chalk.red.bold(`All Roles:`));
          console.table(res);
          console.log(chalk.green.bold(`====================================================================================`));
          
          initialQuery();
        });
      } else if (val.view_table === "Employees") {
          const query = `SELECT emp_id AS Employee_ID, first_name AS First_Name, last_name AS Last_Name, title AS Title, salary AS Salary, departments.name AS Department FROM employees 
          INNER JOIN roles ON employees.role_Id = roles.role_id 
          INNER JOIN departments ON roles.dept_id = departments.dept_id 
          ORDER BY last_name ASC`
        connection.query(query, (err, res) => {
          if (err) throw err;
          console.log(chalk.green.bold(`====================================================================================`));
          console.log(`                              ` + chalk.red.bold(`All Employees:`));
          console.table(res);
          console.log(chalk.green.bold(`====================================================================================`));
          
          initialQuery();
        });
      }
    });
}

addValue = () => {
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
          .then((answer) => {

            console.log(chalk.green.bold(`====================================================================================`));
            console.log(`                     ` + chalk.red.bold(`Department Added:`) + ` ${answer.dept_add}`);
            console.log(chalk.green.bold(`====================================================================================`));
            
            connection.query("INSERT INTO Departments SET ?", {name: answer.dept_add}, (err, res) => {
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
          .then((answer) => {

            console.log(chalk.green.bold(`====================================================================================`));
            console.log(`                     ` + chalk.red.bold(`Role Added:`) + ` ${answer.role_add} with a salary of ${answer.salary}`);
            console.log(chalk.green.bold(`====================================================================================`));
            
            connection.query("INSERT INTO Roles SET ?",
              {
                title: answer.role_add,
                salary: answer.salary,
                dept_id: answer.deptId,
              },
              (err, res) => {
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
              name: "empAddFirstName",
              message:
                "What is the first name of the employee you would like to add?",
            },
            {
              type: "input",
              name: "empAddLastName",
              message:
                "What is the last name of the employee you would like to add?",
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
          .then((answer) => {
            
            console.log(chalk.green.bold(`====================================================================================`));
            console.log(`                     ` + chalk.red.bold(`Employee Added:`) + ` ${answer.empAddFirstName} ${answer.empAddLastName}`);
            console.log(chalk.green.bold(`====================================================================================`));
            
            connection.query("INSERT INTO Employees SET ?",
              {
                last_name: answer.empAddLastName,
                first_name: answer.empAddFirstName,
                role_id: answer.empAddRoleId,
                manager_id: answer.empAddMgrId,
              },
              (err, res) => {
                if (err) throw err;
                initialQuery();
              }
            );
          });
      }
    });
}

function updateRole() {

  // asks the user for the last name of the employee they would like to update
  inquirer
    .prompt([
      {
        name: "newRole",
        type: "input",
        message:
          "What is the last name of the employee you would like to update?",
      },
    ])
    .then((answer) => {
      let newRole = null;
      const query = `SELECT emp_id AS Employee_ID, first_name AS First_Name, last_name AS Last_Name, title AS Title, salary AS Salary, departments.name AS Department FROM employees 
      INNER JOIN roles ON employees.role_Id = roles.role_id
      INNER JOIN departments ON roles.dept_id = departments.dept_id 
      WHERE ?`;
      connection.query(query, { last_name: answer.newRole }, function (err, res) {

        console.log(chalk.green.bold(`====================================================================================`));
        console.log(`                              ` + chalk.red.bold(`Employee Information:`));
        console.table(res);
        console.log(chalk.green.bold(`====================================================================================`));
           
        inquirer
            .prompt({
            name: "idConfirm",
            type: "number",
            message: "Please enter the employee's ID to confirm choice:",
            }).then((answer) => {
            const query = "SELECT * FROM Employees WHERE ?";
            connection.query(query, { emp_id: answer.idConfirm }, function (err, res) {
              for (let i = 0; i < res.length; i++) {
                let newRoleVar = answer.idConfirm;
                inquirer
                .prompt({
                    name: "newRoleId",
                    type: "number",
                    message:
                    "Please enter the new role ID for the employee:",
                })
                .then((answer) => {

                    newRole = answer.newRoleId;
                    
                    const query = `UPDATE Employees SET ? WHERE emp_id = ${newRoleVar}`;

                    connection.query(query, { role_id: answer.newRoleId }, (err, res) => {
                        if (err) throw err;
                        initialQuery();
                    }
                    );
                })
                // .then(() => {
                  
                //   const query = `SELECT title FROM roles WHERE role_id = ${newRole}`;
                //   connection.query(query, (err,res) => {
                //     if (err) throw err;
        
                //     console.log(chalk.green.bold(`====================================================================================`));
                //     console.log(`                     ` + chalk.red.bold(`The `));
                //     console.log(chalk.green.bold(`====================================================================================`));
                    
                //   })
                // });
              }
            }
            );
            });
    
    }
    );
    });
}

removeEmp = () => {

    inquirer
    .prompt([
      {
        name: "empToRemove",
        type: "input",
        message:
          "What is the last name of the employee you would like to remove?",
      },
    ])
    .then((answer) => {
      const query = `SELECT emp_id AS Employee_ID, first_name AS First_Name, last_name AS Last_Name, title AS Title, salary AS Salary, departments.name AS Department FROM employees 
      INNER JOIN roles ON employees.role_Id = roles.role_id
      INNER JOIN departments ON roles.dept_id = departments.dept_id 
      WHERE ?`;
      connection.query(query, { last_name: answer.empToRemove }, (err, res) => {

        console.log(chalk.green.bold(`====================================================================================`));
        console.log(`                              ` + chalk.red.bold(`Employee Information:`));
        console.table(res);
        console.log(chalk.green.bold(`====================================================================================`));
        
        inquirer
            .prompt({
            name: "idConfirm",
            type: "number",
            message: "Please enter the employee's ID to confirm choice:",
            })
            .then((answer) => {
              const query = "SELECT * FROM Employees WHERE ?";
              connection.query(query, { emp_id: answer.idConfirm }, (err, res) => {
              if (err) throw err;
              let idToDelete = answer.idConfirm;
              
              const deleteQuery = `DELETE FROM employees WHERE emp_id = ${idToDelete}`;
              connection.query(deleteQuery, (err,res) => {
                if (err) throw err;
                      
                console.log(chalk.green.bold(`====================================================================================`));
                console.log(`                  ` + chalk.red.bold(`Employee with ID #${idToDelete} has been removed.`));
                console.log(chalk.green.bold(`====================================================================================`));
                

                initialQuery();
              })

                    
            
            }
            );
            });
    
    }
    );
    });
    
}

viewBudget = () => {
  const query = `SELECT departments.dept_id AS Dept_ID, departments.name AS Department_Name, SUM(salary) AS Budget FROM roles 
  INNER JOIN departments ON roles.dept_id = departments.dept_id 
  GROUP BY roles.dept_id;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(chalk.green.bold(`====================================================================================`));
    console.log(`                              ` + chalk.red.bold(`Department Budgets:`));
    console.table(res);
    console.log(chalk.green.bold(`====================================================================================`));
    
    initialQuery();
  })
}

// End of line