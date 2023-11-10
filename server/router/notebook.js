const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const date = require('date-and-time');
const math = require('mathjs');
const conf = require('../conf/database.json')
const moment = require('moment-timezone');

console.log(conf)
var pool = mysql.createPool(conf.poolSetting)

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


router.get("/",(req,res)=>{
    let sql = "SELECT * FROM notebook";
    runsql(sql).then((result)=>{
      result.rows.forEach(row => {
        row.update_time = new Date(row.update_time).toLocaleString(); 
        row.create_time = new Date(row.create_time).toLocaleString(); 
    });
      console.log(result);
      res.json(result);
    }).catch((err)=>{
      console.log(err);
      res.status(500).json(" database error");
    })
});

router.get("/:recode_id",(req,res)=>{
    let sql = "SELECT * FROM notebook where recode_id = ";
    sql = sql + req.params.recode_id + ";";
    runsql(sql).then((result)=>{
        result.rows.forEach(row => {
            row.update_time = new Date(row.update_time).toLocaleString(); 
            row.create_time = new Date(row.create_time).toLocaleString(); 
        });
        console.log(result);
        res.json(result);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json(req.params.recode_id + ": database error");
    })

})

router.post("/",(req,res)=>{
    const recode = req.body.recode;
    const now = new Date();
    const time = date.format(now,'YYYY-MM-DD HH:mm:ss');
    if(!recode){
        res.send("fail! missing data at " + time);
    }else{
      let sql = "insert into notebook(recode,create_time,update_time,archive)values('";
      sql = sql + recode + "','" + time + "','" + time + "', FALSE);";
      console.log(sql);
        //TODO
        //send the data to database
        runsql(sql).then((result)=>{
          console.log(result);
          res.send(JSON.stringify(result));
        }).catch((err)=>{
          console.log(err);
          res.status(500).json("database error");
        })
        
    }
    
});

router.post("/:recode_id",(req,res)=>{
    const id = req.params.recode_id;
    const now = new Date();
    const time = date.format(now,'YYYY-MM-DD HH:mm:ss');
    let sql = "update notebook set archive = 0, update_time = '" + time + "' where recode_id = " + id + ";"
    runsql(sql).then((result)=>{
        console.log(result);
        res.json(result);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json(req.params.recode_id + ": database error");
    })

})

router.delete("/:recode_id",(req,res)=>{
    const id = req.params.recode_id;
    const now = new Date();
    const time = date.format(now,'YYYY-MM-DD HH:mm:ss');
    let sql = "update notebook set archive = 1, update_time = '" + time + "' where recode_id = " + id + ";"
    runsql(sql).then((result)=>{
        console.log(result);
        res.json(result);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json(req.params.recode_id + ": database error");
    })

})


router.put("/:recode_id",(req,res)=>{
    const id = req.params.recode_id;
    const recode = req.body.recode;
    const now = new Date();
    const time = date.format(now,'YYYY-MM-DD HH:mm:ss');
    if(!recode){
        res.send("fail! missing data at " + time);
    }else{
        let sql = "update notebook set update_time = '" + time + "', recode = '" + recode + "' where recode_id = " + id + ";"
        runsql(sql).then((result)=>{
            console.log(result);
            res.json(result);
        }).catch((err)=>{
            console.log(err);
            res.status(500).json(req.params.recode_id + ": database error");
        })
    }
})

module.exports=router;