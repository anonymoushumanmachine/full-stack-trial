const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: "Un-Authorized User" });
    }
    let token = authorization.split(" ")[1];
    if (!token || token === "null") {
      return res.status(401).json({ message: "Un-Authorized User" });
    }

    let userData = jwt.verify(token, process.env.SECRET_KEY);
    req.user = userData;
  } catch (err) {
    return res.status(500).json({ err: err.message, errMessage: "No Access" });
  }

  next();
};
module.exports = userAuth;
