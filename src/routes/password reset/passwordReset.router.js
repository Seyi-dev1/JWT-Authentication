const express = require("express");
const {
  httpSendPasswordResetOTPToEmail,
  httpResetPassword,
} = require("./passwordReset.controller");

const passwordResetRouter = express.Router();

passwordResetRouter.post("/request_otp", httpSendPasswordResetOTPToEmail);

passwordResetRouter.post("/reset", httpResetPassword);

module.exports = passwordResetRouter;
