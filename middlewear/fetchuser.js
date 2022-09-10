const jwt = require("jsonwebtoken");


const fetchuser = (req, res, next) => {
  const authtoken = req.headers.authorization;
  

  if (!authtoken) {
    res.status(401).send({ error: "Accessdenied" });
  }
  try {
    const token = authtoken.split(" ")[1];

    jwt.verify(token,process.env.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(401);
      } else {
        req.user = data;
        next();
      }
    });
  } catch (err) {
    res.sendStatus(403);
    res.send({ err });
  }
};

module.exports = fetchuser;
