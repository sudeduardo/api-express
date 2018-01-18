"use strict";

const mongoose = require("mongoose");
const User = mongoose.model("User");


exports.get = () => {
  return User.find();
}

exports.getById = (id) => {
  return User.findById(id);
}

exports.update = (id, data) => {
  return User.findByIdAndUpdate(id, {$set: data});
}

exports.create = (data) => {
  let user = new User(data);
  return user.save();
}

exports.delete = (id) => {
  return User.findByIdAndRemove(id);
}

exports.authenticate = (email) => {
  return User.findOne({ email: email });
}
