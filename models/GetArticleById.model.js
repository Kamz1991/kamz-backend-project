const db = require("../db/connection");
exports.selectArticleById = async (article_id) => {
  const result = await db.query(
    `SELECT articles.*, 
    COUNT(comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id
    LIMIT 1;`,
    [article_id]
  );

  if (result.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "article not found" });
  } else {
    return result.rows[0];
  }
};
