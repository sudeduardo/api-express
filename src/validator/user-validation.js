const { check } = require('express-validator/check');
const repository = require("../repositores/user-repository");

exports.checkCreate = [

     check('name').exists()
    .not().isEmpty()
    .withMessage("the name must exist and can not be empty"),

    check('email').exists()
    .not().isEmpty().isEmail()
    .withMessage("the email must exist, can not be empty, must have an email format and not repeated "),

    check('password').exists()
    .not().isEmpty().isLength({ min: 6 })
    .withMessage("the password must exist, can not be empty and at least 6 characters")
  ]

  exports.checkLogin =  [
       check('email').exists()
      .not().isEmpty().isEmail()
      .withMessage("the email must exist, can not be empty, must have an email format and not repeated "),

      check('password').exists()
      .not().isEmpty().isLength({ min: 6 })
      .withMessage("the password must exist, can not be empty and at least 6 characters")
    ]
