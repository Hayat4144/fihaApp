const { check, validationResult } = require("express-validator");

exports.Isvalidation =  [
    check("email").isEmail().trim().withMessage('Invalid email id'),
    check("username")
    .notEmpty()
    .trim()
    .isLength({min:3 , max:15})
    .withMessage('username must be 5 character long'),
    check("password")
    .notEmpty()
    .isLength({min:8, max:20})
    .withMessage("Password must be 8 character long"),
   
]
exports.Isrequired = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      res.status(400).send({ errors: errors.array()[0].msg });
    }
    next();
  };
