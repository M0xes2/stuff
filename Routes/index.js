const express = require("express");
const router = new express.Router();
const coolController = require("../Controllers/coolController");

router.get("/", coolController.homePage);

router.get(
  "/login/:id",
  coolController.authMiddleware,
  coolController.homePage
);
router.post("/signup", coolController.createAccount);
router.delete("/removeuser/:id", coolController.deleteUser);

router.get("/pages", coolController.getPages);
router.post("/add", coolController.createPage);
router.patch("/update/:id", coolController.updatePage);
router.delete("/remove/:id", coolController.deletePage);

module.exports = router;
