const util = require('util');
const config = require('config');
let mysql = require('mysql');

const pool = mysql.createPool({
  ...config.get('db'),
  multipleStatements: true,
  connectionLimit: 100,
  waitForConnections: true,
  queueLimit: 0,
  wait_timeout: 60 * 60 * 60,
  connect_timeout: 10
});
pool.query = util.promisify(pool.query); // Magic happens here.
pool.getConnection = util.promisify(pool.getConnection);

// To get transaction connection
pool.getTransactionConnection = async () => {
  try {
    const connection = await pool.getConnection();
    connection.beginTransaction = await util.promisify(
      connection.beginTransaction
    );
    await connection.beginTransaction();
    connection.query = await util.promisify(connection.query);
    connection.rollback = await util.promisify(connection.rollback);
    connection.commit = await util.promisify(connection.commit);
    connection.release = await util.promisify(connection.release);
    return connection;
  }
  catch (error) {
    throw error;
  }
};

// Get Commit and release Pool;
pool.commitAndReleaseConnection = async conn => {
  try {
    await conn.commit();
    conn.release();
    return conn;
  }
  catch (error) {
    throw error;
  }
};

pool.rollbackAndReleaseConnection = async conn => {
  try {
    await conn.rollback();
    await conn.release();
    return conn;
  }
  catch (err) {
    throw new Error(err);
  }
};

module.exports = pool;
