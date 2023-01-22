const mysql = require('mysql'); 

var con = mysql.createConnection({
    host: 'localhost',
    user: '1234',
    password: '1234',
    database: 'homedata'
  });
  
  con.connect((err)=>{
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT * FROM new",(err, result, fields)=>{
      if (err) throw err;
      console.log(result);
    });
  });