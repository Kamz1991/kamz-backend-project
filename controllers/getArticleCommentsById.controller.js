const {
  selectCommentsById,
} = require("../models/getArticleCommentsById.model");
const { selectArticleById } = require("../models/GetArticleById.model");

exports.getCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  return selectArticleById(article_id)
    .then((article) => {
      return selectCommentsById(article_id).then((comments) => {
        res.status(200).send({ comments });
      });
    })
    .catch(next);
};
