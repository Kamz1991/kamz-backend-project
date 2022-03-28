const { selectTopics } = require("../models/model");
exports.getTopics = (req, res) => {
  console.log("in controller ");
  selectTopics()
    .then((result) => {
      console.log(result);
      res.status(200).send({ topics: result });
    })
    .catch((err) => {
      if (err) console.log(err);
    });
};
