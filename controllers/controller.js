const {
  selectTopics,
  selectAuthorById,
  updateArticlesById,
} = require("../models/model");

exports.getTopics = (req, res) => {
  selectTopics()
    .then((result) => {
      res.status(200).send({ topics: result });
    })
    .catch((err) => {
      if (err) console.log(err);
    });
};

exports.getAuthorById = (req, res, next) => {
  const { article_id } = req.params;
  selectAuthorById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticlesById(article_id, inc_votes)
    .then((newVotes) => {
      res.send(newVotes);
    })
    .catch(next);
  branc;
};
