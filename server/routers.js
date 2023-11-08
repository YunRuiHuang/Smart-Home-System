const express = require('express');
const router = express.Router();
const dataPort = require('./router/dataPort');
const note = require('./router/notebook');
const item = require('./router/itemRecode')

router.use("/data",dataPort);
router.use("/note",note);
router.use("/item",item)

module.exports=router;