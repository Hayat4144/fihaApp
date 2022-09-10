const crypto = require("crypto");
var csrftoken;
module.exports.name = "hello";


exports.Csrf = (req, res) => {
  crypto.randomBytes(20, (err, buf) => {
    if (err) {
      console.log(err);
    } else {
      csrftoken = buf.toString("hex");

      res.status(200).send({ token: csrftoken });
    }
  });
};


module.exports.csrftoken ;