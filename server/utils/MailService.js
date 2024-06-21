const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');

const config = require('config');

const SMTP = config.get('SMTP');

exports.mailService = async (
  to, subject, html
) => {
  console.log('Here on line 9, in mailservice');
  // create transporter object with smtp server details
  const transporter = nodemailer.createTransport({
    host: SMTP.host,
    pool: true,
    port: 465,
    secure: true,
    auth: {
      user: SMTP.user,
      pass: SMTP.password
    }
  });

  // send email
  const res = await transporter.sendMail({
    from: SMTP.senderEmail,
    to,
    subject,
    html
  });
  return res;
};
