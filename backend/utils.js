/*global process*/

const Bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const SALT_WORK_FACTOR = 10;
const hash = (pass, cb) => {
  require('env2')('./.env');
  Bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      throw err
    }
    Bcrypt.hash(pass, salt, cb);
  });
}
const sendemail = (sender, recipient, sub, content,cb) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  });
  var mailOptions = {
    from: sender, // sender address
    to: recipient, // list of receivers
    subject: sub, // Subject line
    html: `<b>${content}</b>` // html body
  };
  transporter.sendMail(mailOptions,cb)
}

module.exports = {
  hash,
  sendemail
}
