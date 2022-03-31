const db = require("../db/connection");
exports.updateArticlesById = async (article_id, newVotes) => {
  const result = await db.query(
    `UPDATE articles 
     SET votes = votes + $1 
      WHERE article_id = $2 
      RETURNING *;`,
    [newVotes, article_id]
  );
  if (!result.rows[0]) {
    return Promise.reject({ status: 404, msg: "article not found" });
  } else {
    return result.rows[0];
  }
};
