const { getTopics, getAuthorById } = require("../controllers/controller");
const express = require("express");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getAuthorById);

app.use((err, req, res, next) => {
  const badReqCodes = ["42703", "22P02"];
  if (badReqCodes.includes(err.code)) {
    res.status(400).send({ msg: "bad request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

app.use((err, req, res, next) => {
  console.log(err, "<<< err");
  res.status(500).send({ msg: "internal server error" });
});

module.exports = app;
