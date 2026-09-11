const mongoose = require("mongoose");
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("mongoDB connected successfylly"))
    .catch((err) => console.log("error occured in connecting DB:", err));
};

module.exports = connectDB;
