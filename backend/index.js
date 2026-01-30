const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const indexRoutes = require("./routes/index");

dotenv.config();

const app = express();

const allowedOrigins = ["http://localhost:4173", "http://localhost:5173"];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("server listen on port 3000");
});