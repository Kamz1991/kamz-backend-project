const db = require("../db/connection");
const { selectTopics } = require("../models/getTopic.model");

exports.selectArticles = async () => {
  const result = await db.query("SELECT * FROM articles");
  return result.rows;
};
// exports.selectArticles = async (
//   sort_by = "created_at",
//   order = "desc",
//   topic
// ) => {
//   const topics = await selectTopics();

//   topicsArray = topics.map((object) => object.slug);
//   if (topic !== undefined && !topicsArray.includes(topic)) {
//     return Promise.reject({ status: 404, message: "topic not found" });
//   }
//   const validColumns = [
//     "article_id",
//     "title",
//     "topic",
//     "author",
//     "body",
//     "created_at",
//     "votes",
//     "comment_count",
//   ];
//   if (!validColumns.includes(sort_by)) {
//     return Promise.reject({ status: 400, message: "bad request" });
//   }
//   if (!/^desc$/i.test(order) && !/^asc$/i.test(order)) {
//     return Promise.reject({ status: 400, message: "bad request" });
//   }
//   const queryValues = [];
//   let queryStr = `SELECT articles.*, COUNT(comment_id) AS comment_count
//   FROM articles
//   JOIN comments
//   ON articles.article_id = comments.article_id`;

//   if (topic) {
//     queryStr += ` WHERE topic = $1`;
//     queryValues.push(topic);
//   }

//   queryStr += ` GROUP BY articles.article_id
//   ORDER BY ${sort_by} ${order};`;

//   const results = await db.query(queryStr, queryValues);
//   return results.rows;
// };
