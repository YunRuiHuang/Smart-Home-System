const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: '1234',
  database: 'first'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    return;
  }
  console.log('Connected to database as id', connection.threadId);

  // Perform database operations here

  connection.end((err) => {
    if (err) {
      console.error('Error closing the database connection:', err.stack);
      return;
    }
    console.log('Connection closed.');
  });
});
