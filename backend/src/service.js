// service
const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routers");
const connectDB = require("./config/connectDB");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

connectDB();
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("Connect success!", +port);
});
