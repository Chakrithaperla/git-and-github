require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const uploadRoutes = require("./routes/upload");
const postRoutes = require("./routes/posts");

const app = express();

app.use(express.json());

// routes
app.use("/api/upload", uploadRoutes);
app.use("/api/posts", postRoutes);

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});