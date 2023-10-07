const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const fs = require('fs');

const serverPath = "../../../../../run/user/1000/gvfs/smb-share:server=192.168.1.215,share=file/电影\&番剧/";

app.use(express.json());

app.get('/',(req,res)=>{res.sendFile(path.join(__dirname,'views/html/jump.html'))});
app.get('/image/:img',(req,res)=>{
	let file;
	const address = "/public/image/" + req.params.img;
	try{
	file = path.join(__dirname,address);
	//res.sendFile(file);
	} catch (err){
	res.send("no such file");
	}
	res.sendFile(file);

});
app.get('/script/:js',(req,res)=>{
	let file;
	const address = "/public/script/" + req.params.js;
	try{
	file = path.join(__dirname,address);
	//res.sendFile(file);
	} catch (err){
	res.send("no such file");
	}
	res.sendFile(file);

});
app.get('/css/:css',(req,res)=>{
	let file;
	const address = "/public/CSS/" + req.params.css;
	try{
	file = path.join(__dirname,address);
	//res.sendFile(file);
	} catch (err){
	res.send("no such file");
	}
	res.sendFile(file);

});

app.get('/video/:video',(req,res)=>{
	let file;
	let dir = ""
	if(req.query.path){
		console.log(JSON.parse(req.query.path))
		JSON.parse(req.query.path).forEach(element => {
			dir = dir + element + "/";
		});
	};
	const address = "../../../../../run/user/1000/gvfs/smb-share:server=192.168.1.215,share=file/电影\&番剧/" + dir + req.params.video;
	const stat = fs.statSync(address);
	const fileSize = stat.size;
	const head = {
		'content-Length':fileSize,
		'content-Type':'video/mp4'
	}
	// res.writeHead(200, head);
  	// fs.createReadStream(path).pipe(res);

	file = path.join(__dirname,address);
	res.sendFile(file);
});

app.post('/path',(req,res)=>{
	dirpath = serverPath;
	req.body.path.forEach(dir => {
		dirpath = dirpath + "/" + dir;
	});
	const returnPath = path.join(__dirname,dirpath)
	fs.readdir(returnPath,(err,files)=>{
		if(err){
			res.status(404).json(err);
		}else{
			res.status(200).json({file:files})
    	}
	})
})



app.get('/page/:html',(req,res)=>{
	let file;
	const address = "/views/html/" + req.params.html;
	try{
	file = path.join(__dirname,address);
	//res.sendFile(file);
	} catch (err){
	res.send("no such file");
	}
	res.sendFile(file);

});

app.use("/dataPort",routes.dataPort);
app.use("/user",routes.users);
app.get('/:data',(req,res)=>{res.send(req.params.data)});

app.listen(3000,()=>{console.log("server run at port 3000")});
