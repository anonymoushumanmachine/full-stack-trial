const express = require("express");
const router = express.Router();
const upload = require("../Multer/multer");
// controllers
const { signupController } = require("../Controllers/codeControllers");
// signup route
router.post("/signup", signupController);

module.exports = router;
