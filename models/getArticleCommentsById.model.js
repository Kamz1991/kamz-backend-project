const db = require("../db/connection");

exports.selectCommentsById = async (article_id) => {
  const result = await db.query(
    `SELECT * FROM comments 
      WHERE article_id = $1;`,
    [article_id]
  );

  return result.rows;
};
