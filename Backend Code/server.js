const express = require("express");
const cors = require("cors");
require("dotenv").config();
const codesRouter = require("./Routes/codeRoutes");
const connectDB = require("./Database/database");

//  instance of express
const app = express();
// database connection
connectDB();
// middlewares
app.use(cors());
// routesS
app.use(codesRouter);
const PORT = process.env.PORT || 3000;
// making app to listen
app.listen(PORT, () => console.log("server is listening on port:", PORT));
