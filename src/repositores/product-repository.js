"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.get= () => {
    return Product.find({
        active:true
    }, "title price slug");
}

exports.getBySlug= (slug) => {
    return Product.findOne({
        slug: slug,
        active:true
    }, "title description price slug tags");
}

exports.getById= (id) => {
    return Product
    .findById(id);
}

exports.getByTag = (tag) => {
    return Product.find({
        tags:tag,
        active:true,
    },"title description price slug tags");
}

exports.update= (id,data) =>{
    return Product.findByIdAndUpdate(id,{
        $set: data
    });
}

exports.create= (body) => {
    let product = new Product(body);
    return product.save();
}

exports.delete= (id) => {
    return Product.findByIdAndRemove(id);
}
