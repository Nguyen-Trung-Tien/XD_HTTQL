const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routers");
const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

routes(app);

connectDB();

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Connect success!", port);
});
