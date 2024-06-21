const Mysql = require('../../utils/db');
const { SQL } = require('./sql');

exports.findUserByPrincipleId = async userId => {
  try {
    const result = await Mysql.query(SQL.USER_DETAILS_BY_USER_ID, [userId]);
    return result;
  }
  catch (error) {
    return null;
  }
};

exports.findUserByEmail = async email => {
  try {
    const result = await Mysql.query(SQL.USER_DETAILS_BY_EMAIL, [email]);
    return result;
  }
  catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return null;
  }
};

exports.findEntityCodesByEntityIds = async (entityIds = []) => {
  try {
    const result = await Mysql.query(SQL.ENTITY_CODE, [entityIds]);
    return result;
  }
  catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return null;
  }
};

exports.findEntityCodesByEntityIdsAndRoleIds = async (entityIds = [], roleId = []) => {
  try {
    const result = await Mysql.query(SQL.USER_RIGHTS, [entityIds, roleId]);
    return result;
  }
  catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return null;
  }
};

exports.findUser = async (userId) => {
  try {
    const result = await Mysql.query(SQL.GET_USER, [userId]);
    return result;
  }
  catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return null;
  }
};
