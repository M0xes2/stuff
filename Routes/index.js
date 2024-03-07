const express = require("express");
const router = new express.Router();
const coolController = require("../Controllers/coolController");
const authController = require("../Controllers/authController");

router.get("/", coolController.homePage);

router.get(
  "/login", authController.login
);
router.post("/signup", authController.register);
router.delete("/removeuser/:id", coolController.deleteUser);
router.get("/protected", authController.authCheck, authController.protected);

router.get("/pages", coolController.getPages);
router.post("/add", coolController.createPage);
router.patch("/update/:id", coolController.updatePage);
router.delete("/remove/:id", coolController.deletePage);

module.exports = router;
