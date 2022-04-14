const express = require("express");
const { getTopics } = require("../controllers/getTopic.controller");
const { getArticleById } = require("../controllers/getArticlebyid.controller");
const {
  patchArticleById,
} = require("../controllers/patcharticlebyid.controller");
const { getUsers } = require("../controllers/getUsers.controller");
const { getArticles } = require("../controllers/getArticles.controller");
const {
  postCommentById,
} = require("../controllers/postCommentByarticleId.controller");
const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.patch("/api/articles/:article_id", patchArticleById);

app.get("/api/users", getUsers);

app.get("/api/articles", getArticles);

app.post("/api/articles/:article_id/comments", postCommentById);

app.use((err, req, res, next) => {
  const badReqCodes = ["42703", "22P02", "42601", "23502"];
  if (badReqCodes.includes(err.code)) {
    console.log(err);
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
