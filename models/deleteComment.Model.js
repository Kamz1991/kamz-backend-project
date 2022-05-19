const db = require("../db/connection");
exports.removeComment = async (comment_id) => {
  const result = await db.query(
    `DELETE from comments
      WHERE comment_id = $1
      RETURNING *;`,
    [comment_id]
  );
  return result.rows;
};
