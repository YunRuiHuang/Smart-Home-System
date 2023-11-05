const express = require('express');
const router = express.Router();
const dataPort = require('./router/dataPort');
const note = require('./router/notebook');

router.use("/data",dataPort);
router.use("/note",note);

module.exports=router;