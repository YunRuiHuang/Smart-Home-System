const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const date = require('date-and-time');
const math = require('mathjs');

var pool = mysql.createPool({
    connectionLimit : 10,
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
    
    return new Promise((resolve, reject)=>{
      pool.getConnection((err,connection)=>{
        if(err){
          connection.release();
          reject(err);
        } 
        connection.query(sql,(err,rows)=>{
          connection.release();
          if(err) reject(err);
          resolve({rows:rows});
        })
      })
      // con.query(sql, (err, result) =>{
      //   if(err) reject('err');
      //   resolve(result);
      // })
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

  



router.post("/:machineId",(req,res)=>{
    const machineId = req.params.machineId;
    const temp = req.body.temp;
    const humidity = req.body.humidity;
    const bright = req.body.bright;
    const now = new Date();
    const time = date.format(now,'YYYY-MM-DD HH:mm');
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
        }).catch((err)=>{
          console.log(err);
          res.status(500).json(machineId + ": database error");
        })
        
    }
    
});


router.get("/",(req,res)=>{
  let sql = "SELECT * FROM espdata";
  runsql(sql).then((result)=>{
    console.log(result);
    res.json(result);
  }).catch((err)=>{
    console.log(err);
    res.status(500).json(machineId + ": database error");
  })
});

router.get("/:machineId",(req,res)=>{
  let sql = "SELECT * FROM espdata where machine_id = ";
  sql = sql + req.params.machineId + ";";
  runsql(sql).then((result)=>{
    console.log(result);
    res.json(result);
  }).catch((err)=>{
    console.log(err);
    res.status(500).json(machineId + ": database error");
  })
});

router.get("/:machineId/:num",(req,res)=>{
  let sql = "SELECT * FROM espdata where machine_id = ";
  sql = sql + req.params.machineId + " order by recode_id desc limit " + req.params.num + ";";
  runsql(sql).then((result)=>{
    console.log(result);
    res.json(result);
  }).catch((err)=>{
    console.log(err);
    res.status(500).json(machineId + ": database error");
  })
});

router.get("/:machineId/:month/:day/:year/:hour",(req,res)=>{
  let sql = "SELECT * FROM espdata where machine_id = ";
  sql = sql + req.params.machineId + " and time > ";

  let time = "'" + req.params.year + "-" + req.params.month + "-" + req.params.day;
  if(req.params.hour >= 0 && req.params.hour <= 24){
    //let hour = math.mod((req.params.hour + 5),24);
    time = time + " " + req.params.hour;
    sql = sql + time + "'and time < " + time + "' + INTERVAL 1 hour;";
  }else{
    sql = sql + time + "' and time < " + time + "' + INTERVAL 1 day;";
  }

  console.log(sql);

  runsql(sql).then((result)=>{
    console.log(result);
    res.json(result);
  }).catch((err)=>{
    console.log(err);
    res.status(500).json(machineId + ": database error");
  })
});

module.exports=router;
