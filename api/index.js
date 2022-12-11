import cors from "cors";

import mysql from "mysql";
import { body, validationResult } from "express-validator";
import express from "express";
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "social",
});
const app = express();
db.connect();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/users/:id", (req, res) => {
  fetch(`https://rickandmortyapi.com/api/location/${req.params.id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      db.query(
        `Select * from users where id=${req.params.id}`,
        (err, rows, fields) => {
          res.send({ rickApi: data.name, users: rows[0].name });
        }
      );
    });
});
app.get("/users", (req, res) => {
  db.query("Select * from users", (err, rows, fields) => {
    res.send(rows);
  });
});

app.get("/post/:id", (req, res) => {
  query(`select `);
});
app.post("/users", body("username").isLength({ min: 5 }), (req, res) => {
  const data = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  db.query(
    `insert into users(username, email, password, name) values ('${data.username}', '${data.email}', '${data.password}', '${data.name}')`,
    (err, rows, fields) => {
      console.log(err);
      res.send("ok");
    }
  );
});
app.listen(8800, () => {
  console.log("API working!");
});
