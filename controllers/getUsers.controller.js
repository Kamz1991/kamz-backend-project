const { selectUsers } = require("../models/getUsers.model");

exports.getUsers = (req, res) => {
  selectUsers()
    .then((result) => {
      res.status(200).send({ users: result });
    })
    .catch((err) => {
      if (err) console.log(err);
    });
};
