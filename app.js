const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const expressLayouts = require("express-ejs-layouts");
const { error } = require("console");

// Initialize app
const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/online-store", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("pages", "pages/register");

// Routes
app.use("/auth", authRoutes);
app.use(expressLayouts);

// Server
app.listen(process.env.PORt || 3000, () =>
  console.log("Server running on http://localhost:3000")
);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));
