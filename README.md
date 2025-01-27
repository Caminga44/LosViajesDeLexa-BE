# Set Up Guide

Along this file, you should be able to make run the project

## Install dependencies

 * You need the followng versions and software
  1. Node
  2. NPM LTS
  3. MYSQL 8.0
  4. MYSQL WORKBENCK 5.4
 * run the following command in your terminal:
  1. npm i
 * run the following query into MYSQL WORKBENCH 
  1. ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
  2. change password for your local root password
  3. run query FLUSH PRIVILEGES; 
 * Go to connection.js inside /src/main and change password and root value if it's necessary

At this point, you could run node index.js inside /src/main and the database and tables of this project may be created successfully 🎉