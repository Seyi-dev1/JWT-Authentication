const express = require("express");
const signUpRouter = require("./sign up/signUp.router");
const loginRouter = require("./log in/login.router");
const PrivateRouter = require("./private_data/private.router");

const api = express.Router();

api.use("/signup", signUpRouter);
api.use("/login", loginRouter);
api.use("/private_data", PrivateRouter);

module.exports = api;
