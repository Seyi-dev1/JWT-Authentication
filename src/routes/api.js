const express = require("express");
const signUpRouter = require("./sign up/signUp.router");
const loginRouter = require("./log in/login.router");
const PrivateRouter = require("./private_data/private.router");
const OTPRouter = require("./otp/otp.router");
const emailVerifyRouter = require("./email verification/emailver.router");
const passwordResetRouter = require("./password reset/passwordReset.router");

const api = express.Router();

api.use("/signup", signUpRouter);
api.use("/login", loginRouter);
api.use("/private_data", PrivateRouter);
api.use("/otp", OTPRouter);
api.use("/request_email_otp", emailVerifyRouter);
api.use("/password_reset", passwordResetRouter);

module.exports = api;
