const { fetchEndpoints } = require("../models/getEndpoints.Model");

exports.getEndpoints = (req, res, next) => {
  fetchEndpoints()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
};
