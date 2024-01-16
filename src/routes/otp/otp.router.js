const express = require("express");
const { requestOTP, verifyOTP } = require("./otp.controller");

const OTPRouter = express.Router();

OTPRouter.post("/", requestOTP);
OTPRouter.post("/verify", verifyOTP);

module.exports = OTPRouter;
