const express = require("express");
const postRoute = require("./routes/post_route");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
let Post = require('./models/post');

let path = require("path");

require("dotenv").config();
app.use(cors());
app.use(express.json());

// serve static assets

app.get("/", function (req, res) {
  res.send("hello world");
});
app.get("/test", function (req, res) {
  Post.find({}).then(function (p) {
    res.send(p);
  });
});

app.use("/post", postRoute);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
