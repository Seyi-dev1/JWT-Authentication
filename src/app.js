// mongodb
require("./services/db");

const express = require("express");
const bodyParser = express.json;
const cors = require("cors");
const api = require("./routes/api");

//create server app

const app = express();

app.use(cors());
app.use(bodyParser());
app.use("/api/v1", api);

module.exports = app;
