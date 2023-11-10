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

router.post("/newitem",(req,res)=>{
    const name = req.body.name;
    const item_class = req.body.class;
    const item_subclass = req.body.subclass;
    const item_unit = req.body.unit;

    if(!name | !item_class | !item_subclass | !item_unit){
        res.send("fail! missing data at " + req.body);
    }else{
        let sql = "insert into itemName(item_name,item_class,item_subclass,item_unit)values('";
        sql = sql + name + "','" + item_class + "','" + item_subclass + "','" +  item_unit + "');";
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


router.post("/recode",(req,res)=>{
    const id = req.body.id;
    const amount = req.body.amount;
    const price = req.body.price;
    const now = new Date();
    const time = date.format(now,'YYYY-MM-DD HH:mm:ss');

    if(!id | !amount | !price ){
        res.send("fail! missing data at " + req.body);
    }else{
        let sql = "insert into foodRecode(item_id,amount,price,time)values(";
        sql = sql + id + "," + amount + "," + price + ",'" +  time + "');";
        console.log(sql);
        //TODO
        //send the data to database
        runsql(sql).then((result)=>{
            console.log(result);
            runsql("SELECT * FROM foodAmount where item_id = "+ id + ";").then((result)=>{
                let newsql = "update foodAmount set amount = ";
                if(result.rows.length != 0){
                    let new_amount = result.rows[0].amount + amount;
                    newsql = newsql + new_amount + " where item_id = " + id + ";";
                }else{
                    newsql = "insert into foodAmount(item_id,amount)values(" + id + "," + amount + ");";
                }
                runsql(newsql).then((result)=>{
                    console.log(result);
                    res.send(JSON.stringify(result));
                }).catch((err)=>{
                    console.log(err);
                    res.status(500).json("database error");
                })

            }).catch((err)=>{
                console.log(err);
                res.status(500).json("database error");
            })


        }).catch((err)=>{
            console.log(err);
            res.status(500).json("database error");
        })
        
    }
    
});

router.delete("/recode/:id",(req,res)=>{
    let sql = "SELECT * FROM foodRecode where recode_id = "+ req.params.id + ";";
    runsql(sql).then((result)=>{
        if(result.rows.length!=0){
            let item_id = result.rows[0].item_id;
            let amount = result.rows[0].amount;
            runsql("SELECT * FROM foodAmount where item_id = "+ item_id + ";").then((result)=>{
                let newsql = "update foodAmount set amount = ";
                let new_amount = result.rows[0].amount - amount;
                newsql = newsql + new_amount + " where item_id = " + item_id + ";";
                runsql(newsql).then((result)=>{
                    runsql("delete from foodRecode where recode_id = " + req.params.id + ";").then((result)=>{
                        console.log(result);
                        res.send(JSON.stringify(result));
                    }).catch((err)=>{
                        console.log(err);
                        res.status(500).json("database error: fail to delete");
                    })
                }).catch((err)=>{
                    console.log(err);
                    res.status(500).json("database error: fail to update amount");
                })

            }).catch((err)=>{
                console.log(err);
                res.status(500).json("database error: fail to get amount");
            })


        }else{
            res.status(404).json("no such recode");
        }

    }).catch((err)=>{
            console.log(err);
            res.status(500).json("database error");
    })
})

router.get("/",(req,res)=>{
    let sql = "SELECT * FROM itemName";
    runsql(sql).then((result)=>{
      console.log(result);
      res.json(result);
    }).catch((err)=>{
      console.log(err);
      res.status(500).json(" database error");
    })
});

router.get("/name/:name",(req,res)=>{
    let sql = "SELECT * FROM itemName where item_name = '" + req.params.name + "';";
    runsql(sql).then((result)=>{
      console.log(result);
      res.json(result);
    }).catch((err)=>{
      console.log(err);
      res.status(500).json(" database error");
    })
});

router.get("/id/:id",(req,res)=>{
    let sql = "SELECT * FROM itemName where item_id = '" + req.params.id + "';";
    runsql(sql).then((result)=>{
      console.log(result);
      res.json(result);
    }).catch((err)=>{
      console.log(err);
      res.status(500).json(" database error");
    })
});

router.get("/recode",(req,res)=>{
    let sql = "SELECT * FROM foodRecode";
    runsql(sql).then((result)=>{
      result.rows.forEach(row => {
        row.time = new Date(row.time).toLocaleString(); 
    });
      console.log(result);
      res.json(result);
    }).catch((err)=>{
      console.log(err);
      res.status(500).json(" database error");
    })
});

router.get("/recode/:last_n",(req,res)=>{
    let sql = "SELECT * FROM foodRecode ORDER BY recode_id DESC LIMIT " + req.params.last_n + ";";
    runsql(sql).then((result)=>{
      result.rows.forEach(row => {
        row.time = new Date(row.time).toLocaleString(); 
    });
      console.log(result);
      res.json(result);
    }).catch((err)=>{
      console.log(err);
      res.status(500).json(" database error");
    })
});

router.get("/recode/id/:id",(req,res)=>{
    let sql = "SELECT * FROM foodRecode where item_id = " + req.params.id + ";";
    runsql(sql).then((result)=>{
      result.rows.forEach(row => {
        row.time = new Date(row.time).toLocaleString(); 
    });
      console.log(result);
      res.json(result);
    }).catch((err)=>{
      console.log(err);
      res.status(500).json(" database error");
    })
});

router.get("/amount",(req,res)=>{
    let sql = "SELECT * FROM foodAmount";
    runsql(sql).then((result)=>{
      console.log(result);
      res.json(result);
    }).catch((err)=>{
      console.log(err);
      res.status(500).json(" database error");
    })
});

router.get("/amount/:id",(req,res)=>{
    let sql = "SELECT * FROM foodAmount where item_id = " + req.params.id + ";";
    runsql(sql).then((result)=>{
      console.log(result);
      res.json(result);
    }).catch((err)=>{
      console.log(err);
      res.status(500).json(" database error");
    })
});



module.exports=router;