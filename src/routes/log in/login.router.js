const express = require("express");
const { logIn } = require("./login.controller");
const loginRouter = express.Router();

loginRouter.post("/", logIn);

module.exports = loginRouter;
