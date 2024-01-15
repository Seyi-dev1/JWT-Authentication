const express = require("express");
const showData = require("./private.controller");
const verifyToken = require("../../middleware/auth.middleware");

const PrivateRouter = express.Router();

PrivateRouter.get("/", verifyToken, showData);

module.exports = PrivateRouter;
