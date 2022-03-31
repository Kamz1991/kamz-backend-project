const { selectArticles } = require("../models/getArticles.models");

exports.getArticles = (req, res) => {
  selectArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      if (err) console.log(err);
    });
};
