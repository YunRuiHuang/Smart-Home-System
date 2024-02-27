const express = require('express');
const router = express.Router();

flag = false;
playing = "none"


router.get('/state',(req,res)=>{
  res.json({state:flag});
})

router.put('/state',(req,res)=>{
  flag = !flag;
  res.json({state:flag});
})

router.post('/playing',(req,res)=>{
  playing = req.body.playing;
  res.json({playing});
})

router.get('/playing',(req,res)=>{
  res.json({playing});
})

module.exports=router;