const mailTransporter = require("../utils/mailTransporter");
const CustomError = require("../utils/CustomError");

const sendMail = async (req, res, next) => {
  try {
    const { to, subject, text } = req.body;

    const mailOptions = {
      to,
      subject,
      text,
    };

    if (!to || !subject || !text) {
      throw new CustomError(400, "Invalid payload");
    }

    await mailTransporter(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendMail,
};
