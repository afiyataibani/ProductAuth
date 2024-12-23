const express = require("express");
const path = require("path");
const db = require("./config/database");

const port = 3000;

const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname + "/assets")));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.use("/", require("./routers"));

app.listen(port, (err) => {
  if (!err) {
    db();
    console.log("Listening on port");
    console.log("http://localhost:" + port);
  }
});
