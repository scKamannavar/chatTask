const express = require('express');


const { apiConfig } = require('../constants');


const messageRouter = require('./Message');

const {
  MESSAGE
} = apiConfig;

const router = express.Router();


router.use(MESSAGE.MESSAGE_API, messageRouter);


module.exports = router;
