const express = require("express");
const signUpRouter = require("./sign up/signUp.router");

const api = express.Router();

api.use("/signup", signUpRouter);

module.exports = api;
