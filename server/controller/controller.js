const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path')
const conf = require('../conf/nodeconf.json')

console.log(conf)

router.get('/image/:id',(req,res)=>{
    let file;
    const address = "../" + conf.public_folder.image_path + req.params.id;
    try{
        file = path.join(__dirname,address)
    } catch (err){
        let report = {
            massage : "fie not found",
            error : err
        }
        res.status(404).json(report)
    } finally {
        res.status(200).sendFile(file)
    }
    
})

router.get('/script/:id',(req,res)=>{

})

router.get('/css/:id',(req,res)=>{

})

router.get('/html/:id',(req,res)=>{

})

router.get('/video/:id',(req,res)=>{

})