const db = require("../db/connection");

exports.selectTopics = async () => {
  const result = await db.query("SELECT * FROM topics;");

  return result.rows;
};

exports.selectAuthorById = async (article_id) => {
  const result = await db.query(
    `SELECT * FROM articles WHERE article_id = $1;`,
    [article_id]
  );
  if (result.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "article not found" });
  } else {
    return result.rows[0];
  }
};

exports.updateArticlesById = async (article_id, newVotes) => {
  const result = await db.query(
    `UPDATE articles 
   SET votes = votes + $1 
    WHERE article_id = $2 
    RETURNING *;`,
    [newVotes, article_id]
  );
  return result.rows[0];
};
