"use strict";
const {validationResult} = require("express-validator/check");
const guid = require("guid");
const repository = require("../repositores/order-repository");
const authService = require('../services/auth-service');

exports.post = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.mapped()
            }).end();
    }

 authService.decodeToken(authService.getTokenRequest(req)).then(data=>{

       repository.create({
           user: data.id,
           number: guid.raw().substring(0,6),
           items: req.body.items

       })
        .then(x =>{
             res.status(201).send({
                 message: "Order successfully"
             });
        }).catch(e =>{
             res.status(400).send({
                 message: "Error registering request",
                 data:e
             });
        })
     });

}

exports.get = (req, res, next) => {
    repository.get()
    .then(result =>{
         res.status(200).send(result);
    }).catch(e =>{
         res.status(400).send(e);
    });
}

exports.getById = (req, res, next) => {
   repository.getById(req.params.id)
        .then(result =>{
         res.status(200).send(result);
    }).catch(e =>{
         res.status(400).send(e);
    });
}

exports.put = (req, res, next) => {
     repository.update(req.params.id,req.body)
     .then(x =>{
        res.status(200).send({
            message:"Order successfully updated"
        });
    }).catch(e=>{
        res.status(400).send({
            message:"Failed to update order",
            data:e
        });
    })

}

exports.delete = (req, res, next) => {
    repository.delete(req.body.id)
    .then(x =>{
        res.status(200).send({
            message:"Order successfully removed"
        });
    }).catch(e=>{
        res.status(400).send({
            message:"Removing order failed",
            data:e
        });
    })
}
