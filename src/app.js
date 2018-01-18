"use strict";

global.config = require("./config.json");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressValidator = require('express-validator');



const app = express();
const router = express.Router();

//models
mongoose.connect(global.config.mongo_url, { useMongoClient: true });
mongoose.Promise = global.Promise;

const Product = require("./models/product");
const User = require("./models/user")
const Order = require("./models/order")

//routes files
const index = require("./routes/index");
const products = require("./routes/products");
const users  = require("./routes/users");
const orders = require("./routes/orders");

//middleware express
app.use(expressValidator());
app.use(bodyParser.json({
    limit:'5mb'
}));

app.use(bodyParser.urlencoded({
    extended: false
}));



//define routes path
app.use("/",index);
app.use("/products",products);
app.use("/users",users);
app.use("/orders",orders);

module.exports = app;
