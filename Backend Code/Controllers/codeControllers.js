const User = require("../Model/userModel");
const upload = require("../Multer/multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// signup route
const signupController = async (req, res) => {
  // testing file
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ errMessage: err.message });
    }
    try {
      const { username, password } = req.body;
      if (!username) {
        return res.status(400).json({ message: "please give username" });
      }
      if (!password) {
        return res.status(400).json({ message: "please give password" });
      }
      if (!req.file) {
        return res.status(400).json({ message: "please give image" });
      }
      // secure password
      let hashedPassword = await bcrypt.hash(password, 10);
      // storing in database
      await User.create({
        username,
        password: hashedPassword,
        profilePic: req.file.path,
      });
      return res.status(201).json({ message: "new user created successfully" });
    } catch (error) {
      res.status(500).json({
        error: "error in signupController:",
        errMessage: error.message,
      });
    }
  });
};

// login route
const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      return res.status(400).json({ message: "please give username" });
    }
    if (!password) {
      return res.status(400).json({ message: "please give password" });
    }
    // checking user in database
    let existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(404).json({ errMessage: "User not Found" });
    }
    // check password correct or not
    let verifyPassword = await bcrypt.compare(password, existingUser.password);
    if (!verifyPassword) {
      return res.status(401).json({ errMessage: "Password is Wrong" });
    }
    // generate and assigning token
    let token = jwt.sign(
      { username, imagePath: existingUser.profilePic },
      process.env.SECRET_KEY,
    );
    return res.status(200).json({ message: "Login  successfully", token });
  } catch (error) {
    res.status(500).json({
      error: "error in loginController:",
      errMessage: error.message,
    });
  }
};
// dashboard route
const dashboardController = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ message: "Welcome to Dashboard" });
  } catch (error) {
    res.status(500).json({
      error: "error in profileController:",
      errMessage: error.message,
    });
  }
};
// profile route
const profileController = async (req, res) => {
  try {
    // checking user in database
    const existingUser = await User.findOne({ username: req.user.username });
    if (!req.user || !existingUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res
      .status(200)
      .json({ name: existingUser.username, image: existingUser.profilePic });
  } catch (error) {
    res.status(500).json({
      error: "error in profileController:",
      errMessage: error.message,
    });
  }
};
module.exports = {
  signupController,
  loginController,
  dashboardController,
  profileController,
};
