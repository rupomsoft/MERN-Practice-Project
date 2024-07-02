const nodemailer = require("nodemailer");
const config = require("../config/config");

const mailTransporter = async ({ to, subject, text }) => {
  let transporter = await nodemailer.createTransport({
    host: config.email_host,
    port: Number(config.email_port),
    secure: false,
    auth: {
      user: config.email_username,
      pass: config.email_password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOption = {
    from: config.email_from,
    to,
    subject,
    text,
  };

  return await transporter.sendMail(mailOption);
};

module.exports = mailTransporter;
