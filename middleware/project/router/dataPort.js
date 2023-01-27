const express = require('express');
const router = express.Router();
const mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: '1234',
    password: '1234',
    database: 'homedata'
  });
  
  // con.connect((err) =>{
  //   if(err){
  //     console.log('file to connect' + err.message);
  //     return;
  //   };
  //   console.log('connect success');
  // })

  async function runsql(sql){
    if(con.state === 'disconnected'){
      con.connect((err) =>{
        if(err){
          console.log('file to connect' + err.message);
          return;
        };
        console.log('connect success');
      })
    }
    return new Promise((resolve, reject)=>{
      con.query(sql, (err, result) =>{
        if(err) reject(err);
        resolve(result);
      })
    })
  }

  // async function create(data){
  //   con.connect((err)=>{
  //       if (err) throw err;
  //       console.log("Connected!");
  //       con.query("SELECT * FROM new",(err, result, fields)=>{
  //         if (err) throw err;
  //         console.log(result);
  //         return Promise.all(result);
  //       });
  //   });
  // };

  



router.post("/:machineId",async (req,res)=>{
    const machineId = req.params.machineId;
    const temp = req.body.temp;
    const humidity = req.body.humidity;
    const bright = req.body.bright;
    const date = new Date();
    let time = "22:22-01/01/2000";
    if(!temp || !humidity || !bright){
        res.send(req.params.machineId + "fail! missing data at " + date);
    }else{
      let sql = "insert into espdata(machine_id,temp,humidity,bright,time)values(";
      sql = sql + machineId + ",'" + temp + "','" + humidity + "','" + bright + "','" + time + "');";
      console.log(sql);
        //TODO
        //send the data to database
        runsql(sql).then((result)=>{
          console.log(result);
          res.send(machineId + " : " + JSON.stringify(result));
        })
        
    }
    
});

router.get("/",(req,res)=>{
  let sql = "SELECT * FROM espdata";
  runsql(sql).then((result)=>{
    console.log(result);
    res.send(JSON.stringify(result));
  })
});

module.exports=router;
