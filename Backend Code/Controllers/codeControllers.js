const User = require("../Model/userModel");
const upload = require("../Multer/multer");
const signupController = async (req, res) => {
  // testing file
  upload(req, res, (err) => {
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
      // storing in database
      // await User.create({ username, password, profilePic: req.file.path });
      return res.status(201).json({ message: "new user created successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "error in signup:", errMessage: error.message });
    }
  });
};

module.exports = { signupController };
