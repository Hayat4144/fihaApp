const { check, validationResult } = require("express-validator");

exports.contvalidation =  [
    check("email").isEmail().withMessage('Invalid email id'),
    check("firstname")
    .notEmpty()
    .isLength({min:3 , max:10})
    .withMessage('firstanam must be 3 character long'),
    check("lastname")
    .notEmpty()
    .isLength({min:3, max:8})
    .withMessage("lastname must be 8 character long"),
    check("mobile")
    .isMobilePhone()
    .withMessage('Invalid number'),
    check("zip")
    .isLength({max:6})
    .withMessage('Invalid zip ')
]

exports.validError = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      res.status(400).send({ error: errors.array()[0].msg });
    }
    next();
  };
