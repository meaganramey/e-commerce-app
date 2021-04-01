const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

const db = require("./db.json");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(db.products));
});

// login api endpoint
app.post("/users/login", function (req, res) {
  const { email, password } = req.body;
  const user = db.users.find((user) => user.email === email);
  const correctPassword = bcrypt.compare(password, user.get("password"));
  if (user && correctPassword) {
    const payload = { username: user.get("username") };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.send({
      token,
      username: user.get("username"),
      statusCode: res.statusCode,
    });
  } else {
    next({
      statusCode: 400,
      message: "Invalid username or password",
    });
  }
  res.status(201).json(user);
});


app.get("/scores", (req, res) => {
  if (req.url === undefined) {
    res.statusCode = 404;
    res.send("ERROR NOT FOUND");
  } else {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    const responseBody = JSON.stringify(scores);
    res.send(responseBody);
  }
});

app.post("/scores", function (req, res) {
  scores.push(req.body);
  scores = scores.sort((a, b) => b.score - a.score).slice(0, 3);
  res.status(201).json(scores);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
