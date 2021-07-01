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
  res.header({
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  });
  res.header({
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  });
  // res.header({"Access-Control-Allow-Preflight": "false"})
  if (req.method == "OPTIONS") {
    res.sendStatus(200);
  }
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
        admin: user.isAdmin,
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

app.put("/products/:productId", (req, res) => {
  if (db.products.some((product) => product.id === req.params.productId)) {
    const replacement = db.products.findIndex(
      (p) => p.id === req.params.productId
    );
    const newProduct = req.body.product;
    const oldProduct = db.products[req.params.productId];
    db.products[replacement] = newProduct;
    res.status(200).send({
      statusCode: res.statusCode,
      db: {
        oldProduct: oldProduct,
        newProduct: newProduct,
      },
    });
  } else {
    res.status(400).send({
      statusCode: res.statusCode,
      message: `Could not locate product with id of ${req.params.productId}.`,
    });
  }
});

app.post("/products/add", (req, res) => {
  console.log(req.body);
  const { name, stock, price, shortDesc, description } = req.body;
  if (
    name &&
    shortDesc &&
    description &&
    Number(stock) > 0 &&
    Number(price) > 0
  ) {
    newProduct = {
      id: Date.now(),
      name: name,
      shortDesc: shortDesc,
      description: description,
      stock: stock,
      price: price,
    };
    db.products.push(newProduct);
    delete newProduct.id;
    res.status(202).send({
      statusCode: res.statusCode,
      message: `Sucessfully added the following product to the database: ${newProduct}`,
    });
  } else {
    res.status(400).send({
      statusCode: res.statusCode,
      message:
        "Please be sure to include a name, short description, and long description, and that the stock and prices are greater than 0.",
    });
  }
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

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.use(function (req, res) {
  res.status(404).send("404: Page not Found");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
