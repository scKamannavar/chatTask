const { HttpUtil } = require('../../utils');
const messageService = require('./messageService');
const httpUtil = require('../../utils/HttpUtil');



exports.addMessage = async (req, res) => {
  try {
    const data = req.body;
    const result = await messageService.addMessage(data);
    const results = {
      message : result,
      name : 'bot'
    }
    return res.json(httpUtil.getSuccess(results));
  }
  catch (error) {
    console.log(error);
    return HttpUtil.HandleError(error, res);
  }
};
