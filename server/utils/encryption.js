const CryptoJS = require("crypto-js");

const SECRET_KEY =
  "7cb77-Ar-caf-5d1colab-4530-ae49-time-fe85b7-sheet856fb3-aksYGDHB";

const getEncryptedMessage = (message) => {
 return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
};

const getDecryptedPasswordFromCipher = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

module.exports = { getEncryptedMessage, getDecryptedPasswordFromCipher };