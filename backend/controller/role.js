const model = require("../models/index");

module.exports = {
  getAllRole: async (req, res) => {
    await model.role
      .findAll()
      .then((result) => {
        if (result > 0) {
          res.status(200).json({
            message: "Get Data Passed",
            data: result,
          });
        } else {
          res.status(200).json({
            message: "Data Not Found",
            data: result,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({
          message: error,
        });
      });
  },
};
