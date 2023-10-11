const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');

app.use(express.json());

app.get('/',(req,res)=>{res.sendFile(path.join(__dirname,'public/index.html'))});

app.use("/routs",routes);

app.listen(3000,()=>{console.log("server run at port 3000")});
