const { updateArticlesById } = require("../models/patchArticleById.model");
exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticlesById(article_id, inc_votes)
    .then((newVotes) => {
      res.status(200).send(newVotes);
    })
    .catch(next);
};
