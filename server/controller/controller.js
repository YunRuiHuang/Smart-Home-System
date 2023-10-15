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
        
        res.status(404).json({
            massage : "fie not found",
            error : err
        })
    } finally {
        res.status(200).sendFile(file)
    }
    
})

router.get('/script/:id',(req,res)=>{
    let file;
    const address = "../" + conf.public_folder.script_path + req.params.id;
    try{
        file = path.join(__dirname,address)
    } catch (err){
        
        res.status(404).json({
            massage : "fie not found",
            error : err
        })
    } finally {
        res.status(200).sendFile(file)
    }
})

router.get('/css/:id',(req,res)=>{
    let file;
    const address = "../" + conf.public_folder.CSS_path + req.params.id;
    try{
        file = path.join(__dirname,address)
    } catch (err){
        
        res.status(404).json({
            massage : "fie not found",
            error : err
        })
    } finally {
        res.status(200).sendFile(file)
    }
})

router.get('/html/:id',(req,res)=>{
    let file;
    const address = "../" + conf.public_folder.html_path + req.params.id;
    try{
        file = path.join(__dirname,address)
    } catch (err){
        
        res.status(404).json({
            massage : "fie not found",
            error : err
        })
    } finally {
        res.status(200).sendFile(file)
    }
})

router.get('/video/:video',(req,res)=>{
    let file;
	let dir = "1/2/"
	if(req.query.path){
        dir = ""
		console.log(JSON.parse(req.query.path))
		JSON.parse(req.query.path).forEach(element => {
			dir = dir + element + "/";
		});
	};
	const address = conf.nas_server_path + "电影\&番剧/" + dir + req.params.video;
	const stat = fs.statSync(address);
	const fileSize = stat.size;
	const head = {
		'content-Length':fileSize,
		'content-Type':'video/mp4'
	}
	// res.writeHead(200, head);
  	// fs.createReadStream(path).pipe(res);

	file = path.join(address);
	res.sendFile(file);
})

module.exports=router;