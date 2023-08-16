const express = require("express");
const router = express.Router();
const {gettrains} = require("../controllers/trainController");

router.get("/trains", gettrains);
module.exports = router;