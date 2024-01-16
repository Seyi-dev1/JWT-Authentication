const express = require("express");
const {
  httpSendOTPToEmail,
  httpverifyEmailWithOTP,
} = require("./emailver.controller");

const emailVerifyRouter = express.Router();

// request new verification otp
emailVerifyRouter.post("/", httpSendOTPToEmail);
emailVerifyRouter.post("/verify_email_otp", httpverifyEmailWithOTP);

module.exports = emailVerifyRouter;
