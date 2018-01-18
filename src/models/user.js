"use strict";
const request = require("request-promise");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }]
});

schema.pre('save', function(next) {
    request(global.config.email_validator.replace("{email}",this.email)).then(response => {
        const data = JSON.parse(response);
        if(data.IsValid ==1){
            next()
        }else{
            next(new Error('Invalid Email'))
        }
    })
});


module.exports = mongoose.model('User',schema);