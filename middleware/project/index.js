const express = require('express');
const app = express();
const routes = require('./router/users.js');
const path = require('path');

app.use(express.json());

app.get('/',(req,res)=>{res.sendFile(path.join(__dirname,'/html/home.html'))});
app.get('/image/:img',(req,res)=>{
	let file;
	const address = "/image/" + req.params.img;
	try{
	file = path.join(__dirname,address);
	//res.sendFile(file);
	} catch (err){
	res.send("no such file");
	}
	res.sendFile(file);

});


app.use("/user",routes);
//app.get('/:data',(req,res)=>{res.send(req.params.data)});

app.listen(3000,()=>{console.log("server run at port 3000")});
