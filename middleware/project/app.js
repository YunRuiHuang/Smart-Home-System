const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');

app.use(express.json());

app.get('/',(req,res)=>{res.sendFile(path.join(__dirname,'views/html/home.html'))});
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

app.use("/dataPort",routes.dataPort);
app.use("/user",routes.users);
app.get('/:data',(req,res)=>{res.send(req.params.data)});

app.listen(3000,()=>{console.log("server run at port 3000")});
