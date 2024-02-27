const express = require('express');
const router = express.Router();
const dataPort = require('./router/dataPort');
const note = require('./router/notebook');
const item = require('./router/itemRecode');
const music = require('./router/musicPlayer');

router.use("/data",dataPort);
router.use("/note",note);
router.use("/item",item);
router.use("/music",music);

module.exports=router;