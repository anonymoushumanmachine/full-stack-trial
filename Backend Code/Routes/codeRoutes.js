const express = require("express");
const router = express.Router();
const upload = require("../Multer/multer");
const userAuth = require("../Middlewares/userAuth");
// controllers
const {
  signupController,
  loginController,
  profileController,
  dashboardController,
} = require("../Controllers/codeControllers");
// signup route
router.post("/signup", signupController);
// login route
router.post("/login", loginController);
// dashboard route
router.get("/dashboard", userAuth, dashboardController);
// profile route
router.get("/profile", userAuth, profileController);

module.exports = router;
