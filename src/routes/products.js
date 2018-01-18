"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/product-controller");
const validator = require("../validator/product-validation");
const authService = require('../services/auth-service');



router.get('/',controller.get)
router.get('/:slug',controller.getBySlug)
router.get('/id/:id',controller.getById)
router.get('/tags/:tag',controller.getByTag)
router.post('/',[authService.isAdmin,validator.checkCreate], controller.post)
router.put('/:id',authService.isAdmin,controller.put)
router.delete('/',authService.isAdmin, controller.delete)

module.exports = router;
