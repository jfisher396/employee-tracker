
  
# Employee Tracker

<p>
    <img src="https://img.shields.io/badge/-JavaScript-blue" />
    <img src="https://img.shields.io/badge/mySQL-orange"  />
    <img src="https://img.shields.io/badge/npm-red" />
    <img src="https://img.shields.io/badge/-node.js-green" />
</p>

---

## Table of Contents
* [Description](#description)
* [Schema](#schema)
* [Visuals](#visuals)
* [Walkthrough_Video](#walkthrough-video)
* [License](#license)
* [Contributing](#contribution)
* [Questions](#contact-information)

---

## Description

  A **C**ontent **M**anagement **S**ystem solution for managing a company's employees using Node.js, the Inquirer npm package and a MySQL database.  A bootcamp coding assignment, my challenge was to build this app from scratch with only a MySQL schema as reference. Application also utilizes the following NPM packages: Figlet, Chalk and console.table.

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

---
  
## Schema

<img src="media/schema.png" width="600">

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
---

## Visuals

![screenshot1](/media/employee-tracker-1.png)

---
![screenshot2](/media/employee-tracker-2.png)

---
![screenshot](/media/employee-tracker-3.png)

---
![screenshot2](/media/employee-tracker-4.png)

---

## Walkthrough Video

[Link to walkthrough video](https://drive.google.com/file/d/1vJN3fQkYHDl5DWrH7__TFE1T8KD0wgrA/view)

---

## License
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  * For more information on license types, please reference this website
  for additional licensing information - [https: //choosealicense.com/](https://choosealicense.com/).

---

## Contributing

  Not accepting contributions.

---

## Contact Information
  * GitHub Username: [jfisher396](https://github.com/jfisher396)
  * Email: james@james-fisher-web-developer.com
  * <p>
    <a href="https://www.linkedin.com/in/jamesfisher-webdev/"><img alt="Linkedin: James Fisher" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank" /></a>
    </p>
