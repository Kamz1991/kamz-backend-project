const { removeComment } = require("../models/deleteComment.Model");
exports.deleteComment = async (req, res) => {
  const { comment_id } = req.params;
  await removeComment(comment_id);
  res.sendStatus(204);
};
