const mysql = require('mysql'); 
const date = require('date-and-time');
const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname,"./")
fs.readdir(dirPath,(err,files)=>{
    if(err){
        console.log(err)
    }else{
        console.log(files)
    }
})




// const now  =  new Date();
  
// Formatting the date and time
// by using date.format() method
// const value = date.format(now,'YYYY-MM-DD HH:mm');

// var con = mysql.createConnection({
//     host: 'localhost',
//     user: '1234',
//     password: '1234',
//     database: 'homedata'
//   });
  
//   con.connect((err)=>{
//     if (err) throw err;
//     console.log("Connected!");
//     let sql = "insert into espdata(machine_id,temp,humidity,bright,time)values(1,'0','0','0','"+value+"');"
//     con.query(sql,(err, result, fields)=>{
//       if (err) throw err;
//       console.log(result);
//     });
//   });
  
// Display the result
// console.log("current date and time : " + value)