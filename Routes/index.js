const express = require("express");
const router = new express.Router();
const coolController = require("../Controllers/coolController");
const middlewareUpload = require("../MiDDleware/middlewarUpload");
const authController = require("../Controllers/authController");

router.get("/", coolController.homePage);
router.post("/uploadPFP", middlewareUpload.upload, coolController.updatePFP);

router.post("/login", authController.login);
router.post("/signup", authController.register);
router.delete("/removeuser/:id", coolController.deleteUser);
router.get("/protected", authController.authCheck, authController.protected);

router.get("/page/:id", coolController.getPage);
router.post("/add", authController.authCheck, coolController.createPage);
router.patch("/update/:id",  authController.authCheck, coolController.updatePage);
router.delete(
  "/remove/:id",
  authController.authCheck,
  coolController.deletePage
);

module.exports = router;
