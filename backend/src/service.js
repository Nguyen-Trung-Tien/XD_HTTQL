// service
const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routers");
const connectDB = require("./config/connectDB");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes(app);

connectDB();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("hello word");
});

app.listen(port, () => {
  console.log("Connect success!", +port);
});
