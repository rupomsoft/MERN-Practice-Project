const express = require("express");

const emailSenderController = require("../../controllers/email-sender.controller");

const router = express.Router();

router.post("/", emailSenderController.sendMail);
module.exports = router;
