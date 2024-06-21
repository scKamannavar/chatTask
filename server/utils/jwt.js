const jwt = require('jsonwebtoken');

const secretKey = 'fa218978ce74e63bca1a3b532fca8f874b8c71396c1640210c7f199c9e3b3f2e';

function generateToken(payload) {
  // console.log('payload', payload);
  const token = jwt.sign(payload, secretKey, { expiresIn: '2 days' });
  // console.log('Generated Token:', token);
  return token;
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(decoded);
      }
    });
  });
}
function decryptToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded && decoded.userId) {
      return decoded.userId;
    }
    console.error('Token does not contain userId');
    return null;
  }
  catch (error) {
    console.error('Error decrypting token:', error.message);
    return null;
  }
}
module.exports = { generateToken, verifyToken, decryptToken };
