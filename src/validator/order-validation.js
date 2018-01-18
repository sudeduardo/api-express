const { check } = require('express-validator/check');

exports.checkCreate = [

    check('items').exists()
    .custom(items =>
                  Array.isArray(items) &&
                  items.length>0 &&
                  items.every(item =>  typeof(item) == "object" &&
                                      item.hasOwnProperty("quantity") &&
                                      item.hasOwnProperty("product")))
    .withMessage("the items must exist, must be an array and can not be empty"),

  ]
