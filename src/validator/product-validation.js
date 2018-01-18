const { check } = require('express-validator/check');

exports.checkCreate = [

    check('title').exists()
    .not().isEmpty()
    .withMessage("the title must exist and can not be empty"),

    check('slug').exists()
    .not().isEmpty()
    .withMessage("the slug must exist and can not be empty"),

    check('description').exists()
    .not().isEmpty()
    .withMessage("the description must exist and can not be empty"),

    check('price').exists()
    .custom((price) => !isNaN(price)).not()
    .isEmpty().withMessage("the price must exist and must be a number"),

    check('tags').exists().
    custom(tags => Array.isArray(tags) && tags.length>0 && tags.every(tag => tag.length>0))
    .withMessage("The tags must exist, must be an array and can not be empty"),

    check('image').exists()
    .not().isEmpty().custom(image => typeof(image)=== "object" &&  image.hasOwnProperty("path") && image.hasOwnProperty("public_id") )
    .withMessage("the image must exist and can not be empty")

  ]
