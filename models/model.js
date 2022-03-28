const db = require("../db/connection");

exports.selectTopics = () => {
  return db
    .query("SELECT * FROM topics;")
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      if (err) console.log(err);
    });
};
