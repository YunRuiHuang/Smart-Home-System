const express = require('express');
const router = express.Router();
const path = require('path');


router.post("/:machineId",(req,res)=>{
    const machineId = req.params.machineId;
    const temp = req.body.temp;
    const humidity = req.body.humidity;
    const light = req.body.light;
    let date = new date();
    if(!temp || !humidity || !light){
        res.send(req.params.machineId + "fail! missing data");
    }else{
        //TODO
        //send the data to database

        res.send(req.params.machineId + "success");
    }
    
});

module.exports=router;
