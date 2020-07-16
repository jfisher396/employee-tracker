INSERT INTO Departments (name)
VALUES ("Sales"), ("Service"), ("Repair"), ("Rentals");

INSERT INTO Roles (title,salary,dept_id)
VALUES ("Sales Manager", 120000, 1), ("Salesperson", 75000, 1), ("Service Tech", 45000, 2),
("Rental Tech", 35000, 4), ("Repair Technician", 40000, 3), ("Rental Manager", 65000, 4);

INSERT INTO Employees (first_name,last_name,role_id,manager_id)
VALUES ("Doug", "Jones", 1, null), ("Jerry", "Lee", 2, 1), ("Donna", "Reed", 3, null),
("Agnus","Grant", 6, null), ("Bo", "Peep", 4, 4), ("Jack", "Nicholson",5, null), ("Doc", "Brown",2, 1);