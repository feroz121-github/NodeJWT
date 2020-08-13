require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
//to get Crypto code - in Terminal type
//node
//> require('crypto').randomBytes(64).toString('hex')
const posts = [
  {
    username: "test1",
    post: "Post1",
  },
  {
    username: "test2",
    post: "Post2",
  },
];

app.listen(3000);
app.use(express.json());

app.get("/api/posts", authenticateToken, (req, res) => {
  res.json(posts);
});

app.post("/api/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN_TEST);
  res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  //console.log(token);
  if (token == null) return res.sendStatus(401);
  //console.log("2");
  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN_TEST, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
