const { selectTopics } = require("../models/getTopic.model");

exports.getTopics = (req, res) => {
  selectTopics()
    .then((result) => {
      res.status(200).send({ topics: result });
    })
    .catch((err) => {
      if (err) console.log(err);
    });
};
