const config = require('config');

const gateway = config.get('gateway');

exports.ROOT_URL = gateway.rooturl;


exports.MESSAGE = {
  MESSAGE_API: '/message'
};
