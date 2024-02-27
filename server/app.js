const express = require('express');
const app = express();
const routers = require('./routers');
const controller = require('./controller/controller')
const path = require('path');
const cors = require('cors')

app.use(express.json());
app.use(cors())

// to access home html page
app.get('/',(req,res)=>{res.sendFile(path.join(__dirname,'public/index.html'))});

// to access favicon.ico
app.get('/favicon.ico',(req,res)=>{res.sendFile(path.join(__dirname,'favicon.ico'))});

// to router
app.use("/routers",routers);

// To Access all the public file via thes controller
app.use("/source",controller);

app.listen(3000,()=>{console.log("server run at port 3000")});
