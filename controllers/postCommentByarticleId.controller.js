const { sendCommentById } = require("../models/postCommentByArticleId.model");

exports.postCommentById = async (req, res, next) => {
  const { article_id } = req.params;

  const new_comment = req.body;

  await sendCommentById(article_id, new_comment)
    .then((newComment) => {
      res.status(201).send({ comment: newComment });
    })
    .catch(next);
};
