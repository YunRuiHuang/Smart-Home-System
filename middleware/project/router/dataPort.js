const express = require('express');
const router = express.Router();


router.post("/:machineId",(req,res)=>{
    const machineId = req.params.machineId;
    const temp = req.body.temp;
    const humidity = req.body.humidity;
    const light = req.body.light;
    const date = new Date();
    if(!temp || !humidity || !light){
        res.send(req.params.machineId + "fail! missing data at " + date);
    }else{
        //TODO
        //send the data to database

        res.send(machineId + "success");
    }
    
});

module.exports=router;
