const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// mongo
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

// test
app.get("/", (req, res) => {
  res.send("Social Media API Running");
});

// server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});