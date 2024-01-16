const express = require("express");
const GetOTP = require("./otp.controller");

const OTPRouter = express.Router();

OTPRouter.post("/", GetOTP);

module.exports = OTPRouter;
