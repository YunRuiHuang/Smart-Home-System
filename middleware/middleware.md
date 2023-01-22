## database
### user and privileges
- creat user
    - `CREATE USER 'user1'@localhost IDENTIFIED BY 'password1';`
- give privileges
    - `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';`
    - or `GRANT ALL PRIVILEGES ON 'yourDB'.* TO 'user1'@localhost;`
    - `flush privileges;`
- check privileges
    - `SHOW GRANTS FOR 'user1'@localhost;`

### mysql query
- `show databases;`
- `create database xxx;`
- `create table new(id int primary key, data varchar(10));`
- `INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')`
- `DELETE FROM customers WHERE address = 'Mountain 21'`
- `SELECT * FROM customers`
- `UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'`
