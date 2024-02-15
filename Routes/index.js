const express = require("express");
const router = new express.Router();
const coolController = require("../Controllers/coolController")
router.get("/", coolController.homePage);
router.post("/add", coolController.createPage)
module.exports = router;