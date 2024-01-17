const express = require("express");
const httpSendPasswordResetOTPToEmail = require("./passwordReset.controller");

const passwordResetRouter = express.Router();

passwordResetRouter.post("/request_otp", httpSendPasswordResetOTPToEmail);

module.exports = passwordResetRouter;
