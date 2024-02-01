const express = require("express");
const router = new express.Router();
const coolController = require("../Controllers/coolController")
router.get("/", coolController.authMiddlewareSample, coolController.homePage);
module.exports = router;