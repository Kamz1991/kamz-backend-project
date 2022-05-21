const db = require("../db/connection");
const { selectTopics } = require("../models/getTopic.model");

exports.selectArticles = async (query) => {
  const { sort_by = "created_at", order = "desc" } = query;

  const validColumns = [
    "article_id",
    "title",
    "topic",
    "author",
    "body",
    "created_at",
    "votes",
    "comment_count",
  ];
  if (!validColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, message: "bad request" });
  }
  if (!["asc", "desc"].includes(order.toLowerCase())) {
    return Promise.reject({ status: 400, message: "bad request" });
  }
  const topicsQuery = !!query.topic ? `WHERE topic='${query.topic}'` : "";
  console.log(topicsQuery);
  const result = await db.query(`SELECT * 
  FROM articles
  ${topicsQuery}
  ORDER BY ${sort_by}  ${order}
  
  `);

  return result.rows;
};
