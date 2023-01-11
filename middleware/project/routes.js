const express = require('express');
const router = express.Router();

const users = require('./router/users');
const dataPort = require('./router/dataPort');

module.exports={users, dataPort};
