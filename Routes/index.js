const express = require("express");
const router = new express.Router();
const coolController = require("../Controllers/coolController");
const middlewareUpload = require("../MiDDleware/middlewarUpload");
const authController = require("../Controllers/authController");

router.get("/", coolController.homePage);
router.post("/uploadTest", middlewareUpload.upload, coolController.createPage);

router.post("/login", authController.login);
router.post("/signup", authController.register);
router.delete("/removeuser/:id", coolController.deleteUser);
router.get("/protected", authController.authCheck, authController.protected);

router.get("/page/:id", coolController.getPage);
router.post("/add", coolController.createPage);
router.patch("/update/:id", coolController.updatePage);
router.delete(
  "/remove/:id",
  authController.authCheck,
  coolController.deletePage
);

module.exports = router;
