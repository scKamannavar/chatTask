const express = require('express');

const {
  asyncMiddleware: _async
} = require('../../common/security/asyncMiddleware');

const messageHandler = require('./messageHandler');

const router = express.Router();

router.use((req, res, next) => {
  next();
});


router.post('/add-message', [
  _async(messageHandler.addMessage)
]);


module.exports = router;
