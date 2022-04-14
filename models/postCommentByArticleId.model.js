const db = require("../db/connection");
exports.sendCommentById = async (article_id, new_comment) => {
  const result = await db.query(
    `
  INSERT INTO comments
  (author, body, article_id) 
  VALUES($1, $2, $3) 
  RETURNING *`,
    ["butter_bridge", "The greatest alive", article_id]
  );

  if (!result.rows[0]) {
    console.log(result.rows[0]);
    return Promise.reject({ status: 404, msg: "article not found" });
  } else {
    console.log(result.rows[0]);
    return result.rows[0];
  }
};
