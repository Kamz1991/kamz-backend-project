const db = require("../db/connection");
exports.sendCommentById = async (article_id, new_comment) => {
  console.log(new_comment, "IN HERE");
  console.log(article_id, "<<<<<<<");
  const result = await db.query(
    `
  INSERT INTO comments
  (author, body, article_id) 
  VALUES($1, $2, $3) 
  RETURNING *`,
    [new_comment.username, new_comment.body, article_id]
  );

  if (!result.rows[0]) {
    return Promise.reject({ status: 404, msg: "article not found" });
  } else if (!new_comment.body) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  } else {
    return result.rows[0];
  }
};
