const express = require('express');
const router = express.Router();
const dataPort = require('./router/dataPort');

router.use("/data",dataPort);

module.exports=router;