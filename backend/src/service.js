const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routers");
const connectDB = require("./config/connectDB");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

connectDB();
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("Connect success!", +port);
});
