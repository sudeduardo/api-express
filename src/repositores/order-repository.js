"use strict";

const mongoose = require("mongoose");
const Order = mongoose.model("Order");

exports.get= () => {
    return Order
    .find({},"number status createDate user items ")
    .populate('user', 'name')
    .populate('items.product', 'title');
}

exports.getById= (id) => {
    return Order
    .findById(id);
}

exports.update= (id,data) =>{
    return Order.findByIdAndUpdate(id,{
        $set: data
    });
}

exports.create= (data) => {
    let order = new Order(data);
    return order.save();
}

exports.delete= (id) => {
    return Order.findByIdAndRemove(id);
}