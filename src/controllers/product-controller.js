"use strict";
const {validationResult} = require("express-validator/check");
const repository = require("../repositores/product-repository");

exports.post = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.mapped()
            }).end();
    }

   repository.create(req.body)
    .then(x =>{
         res.status(201).send({
             message: "Product successfully registered!"
         });
    }).catch(e =>{
         res.status(400).send({
             message: "Failed to register product",
             data:e
         });
    })

}

exports.get = (req, res, next) => {
    repository.get()
    .then(result =>{
         res.status(200).send(result);
    }).catch(e =>{
         res.status(400).send(e);
    });
}

exports.getBySlug = (req, res, next) => {
    repository.getBySlug(req.params.slug)
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

exports.getByTag = (req, res, next) => {
    repository.getByTag(req.params.tag)
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
            message:"Product updated successfully"
        });
    }).catch(e=>{
        res.status(400).send({
            message:"Failed to update product",
            data:e
        });
    })

}

exports.delete = (req, res, next) => {
    repository.delete(req.body.id)
    .then(x =>{
        res.status(200).send({
            message:"Product successfully removed"
        });
    }).catch(e=>{
        res.status(400).send({
            message:"Failed to remove product",
            data:e
        });
    })
}
