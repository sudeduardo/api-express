"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/user-controller");
const validator = require("../validator/user-validation");

const authService = require('../services/auth-service');

router.get('/',controller.get)
router.get('/id/:id',controller.getById)
router.post('/',[validator.checkCreate,authService.authorize], controller.post)
router.post('/authenticate', validator.checkLogin, controller.authenticate)
router.post('/refresh-token', authService.authorize, controller.refreshToken);
router.put('/:id',authService.authorize,controller.put)
router.delete('/',authService.authorize, controller.delete)

module.exports = router;
