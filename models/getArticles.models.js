const db = require("../db/connection");

exports.selectArticles = async () => {
  const result = await db.query("SELECT * FROM articles");
  return result.rows;
};
