require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3001;

// Express Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});
const db = require("./db.json");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(db.products));
});

// login api endpoint
app.post("/auth/login", function (req, res) {
  const { email, password } = req.body;
  const user = db.users.find((user) => user.email === email);
  if (user) {
    const correctPassword = bcrypt.compare(password, user.password);
    if (user && correctPassword) {
      const payload = { email: user.email };
      const token = jwt.sign(payload, process.env.REACT_APP_JWT_SECRET, {
        expiresIn: "24h",
      });
      res.send({
        token,
        email: user.email,
        statusCode: res.statusCode,
      });
    }
  } else {
    res.status(400).send({
      statusCode: 400,
      message: "Invalid username or password",
    });
  }
});

app.post("/auth/signup", async function (req, res) {
  const { email, password } = req.body;
  if (email && password && password.length > 3) {
    bcryptPassword = await bcrypt.hash(password, 8);
    newUser = {
      email: email,
      password: bcryptPassword,
      id: Date.now(),
    };
    db.users.push(newUser);
    delete newUser.id;
    delete newUser.password;
    res.send({
      user: newUser,
      statusCode: res.statusCode,
    });
  } else {
    res.status(400).send({
      statusCode: res.statusCode,
      message: "Invalid email or password",
    });
  }
});

app.get("/auth/logout", (req, res) => {
  // req.logout requires npm i passport
  // req.logout()
  console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    res.status(400).send("User must first be logged in.");
  } else {
    res.status(200).send({
      statusCode: res.statusCode,
      message: "Sucessfully logged out.",
    });
  }
});

app.put('/products/:productId', (req, res) => {
  if (db.products.some((product) => product.id === req.params.productId)){
    const newProduct = req.body
    const oldProduct = db[req.params.productId]
    db[req.params.productId] = newProduct
    res.status(200).send({
      statusCode: res.statusCode,
      db: {
        oldProduct: oldProduct,
        newProduct: newProduct
      }
    })
  } else {
    res.status(400).send({
      statusCode: res.statusCode,
      message: `Could not locate product with id of ${req.params.productId}.`
    })
  }
})

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
