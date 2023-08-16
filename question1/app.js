const trainroute = require("./routes/trainroute");
const express = require("express");
const app = express();
app.use(trainroute)
module.exports = app;
