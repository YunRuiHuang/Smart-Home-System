const express = require('express');
const router = express.Router();
const path = require('path');

router.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,'../views/html/user.html'));
});

router.get("/:index",(req,res)=>{
  res.send(req.params.index);
});

module.exports=router;
