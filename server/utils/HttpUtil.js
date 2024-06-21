"use strict";

/**
 * @file HttpUtil is util function, It will provide the support functions to create respones objects.
 * @copyright www.neviton.com
 */

/**
 * If request is sucess
 *
 * @param {any} payLoad It is any value to send as response.
 * @param {string} errorMessage It is string value to send as respone message
 * @return {object} {status=200, errorCode=null, errorMessage='OK', payLoad=data }
 */
exports.getSuccess = (payLoad = null, message = "OK") => {
  return {
    status: 200,
    errorCode: null,
    message,
    payLoad
  };
};

/**
 * If resource is created.
 *
 * @param {any} payLoad It is any value to send as response.
 * @param {string} errorMessage It is string value to send as respone message
 * @return {object} {status=201, errorCode=null, errorMessage='Created', payLoad=data }
 */
exports.getCreated = (payLoad = null, message = "Created") => {
  return {
    status: 201,
    errorCode: null,
    message,
    payLoad
  };
};

/**
 * If any invalid request or request data.
 *
 * @param {array} error It is an array of error code and error message.
 * @return {object} {status=400, errorCode=error[0], errorMessage='Bad Request', payLoad=null }
 */
exports.getBadRequest = (error = [null, "Bad Request"]) => {
  return {
    status: 400,
    errorCode: error[0],
    errorMessage: error[1],
    payLoad: null
  };
};

/**
 * If any server side Exception.
 *
 * @param {array} error It is an array of error code and error message.
 * @return {object} {status=500, errorCode=error[0], errorMessage='Internal Server Error', payLoad=null }
 */
exports.getException = (error = [null, "Internal Server Error"]) => {
  return {
    status: 500,
    errorCode: error[0],
    errorMessage: error[1],
    payLoad: null
  };
};

/**
 * If any Unauthorized request.
 *
 * @param {array} error It is an array of error code and error message.
 * @return {object} {status=401, errorCode=error[0], errorMessage='Unauthorized', payLoad=null }
 */
// UNAUTHORIZED(401, "Unauthorized"),
exports.getUnauthorized = (error = [null, "Unauthorized"]) => {
  return {
    status: 401,
    errorCode: error[0],
    errorMessage: error[1],
    payLoad: null
  };
};

/**
 * If Access denined.
 *
 * @param {array} error It is an array of error code and error message.
 * @return {object} {status=403, errorCode=error[0], errorMessage='Forbidden', payLoad=null }
 */
exports.getAccessDenined = (error = [null, "Forbidden"]) => {
  return {
    status: 403,
    errorCode: error[0],
    errorMessage: error[1],
    payLoad: null
  };
};

/**
 * If Requested data or record is not found.
 *
 * @param {array} error It is an array of error code and error message.
 * @return {object} {status=404, errorCode=error[0], errorMessage='Not Found', payLoad=null }
 */
exports.getBadRequest = (error = [null, "Not Found"]) => {
  return {
    status: 404,
    errorCode: error[0],
    errorMessage: error[1],
    payLoad: null
  };
};

exports.HandleError = (error, res, connection, releaseConncetion) => {
  if (
    ["ValidationError", "DuplicateError", "RequestError"].includes(error.name)
  ) {
    return res.json(this.getBadRequest([error.name, error.message]));
  }
  if(["ER_NO_REFERENCED_ROW"].includes(error.code)){

    return res.json(this.getBadRequest([error.code, error.sqlMessage]));

  }
  if (connection && connection.threadId) releaseConncetion(connection);
  console.log('error',error);
  return res.json(this.getException());
};
