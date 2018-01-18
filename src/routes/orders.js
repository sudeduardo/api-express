"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/order-controller");
const validator = require("../validator/order-validation");
const authService = require('../services/auth-service');

router.get('/',authService.authorize,controller.get)
router.get('/id/:id',authService.authorize,controller.getById)
router.post('/',[validator.checkCreate,authService.authorize], controller.post)
router.put('/:id',authService.authorize,controller.put)
router.delete('/',authService.authorize, controller.delete)

module.exports = router;