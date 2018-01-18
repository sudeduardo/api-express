"use strict";

const {validationResult} = require("express-validator/check");
const bcrypt = require('bcrypt');

const repository = require("../repositores/user-repository");
//services
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');

//error rules body
const reqError = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.mapped()}).end();
  }
}

exports.post = (req, res, next) => {
  reqError(req, res);
  let data = req.body;
  data.password = bcrypt.hashSync(data.password, 10);
  data.roles=['user'];
  repository.create(data).then(x => {
    emailService.sendEmailWelocme(req.body)
    res.status(201).send({message: "Username registered successfully"});
  }).catch(e => {
    res.status(400).send({message: "Failed to register User", data: e});
  })

}

exports.authenticate = (req, res, next) => {

  reqError(req, res);
  const {body} = req;
  repository.authenticate(body.email).then(data => {

    if(!data) res.status(404).send({message: "Incorrect user or password values"});

    if (bcrypt.compareSync(body.password, data.password)) {
      authService.generateToken({id:data._id,email: body.email, name: data.name, roles: data.roles}).then(token => {

        res.status(200).send({
          token: token,
           data: {
              email: body.email,
              name: data.name
            }
          });

      });

    } else res.status(404).send({message: "Incorrect password"});

  }).catch(e => res.status(400).send(e));
}

exports.get = (req, res, next) => {
  repository.get().then(result => {
    res.status(200).send(result);
  }).catch(e => {
    res.status(400).send(e);
  });
}

exports.getById = (req, res, next) => {
  repository.getById(req.params.id).then(result => {
    res.status(200).send(result);
  }).catch(e => {
    res.status(400).send(e);
  });
}

exports.put = (req, res, next) => {
  repository.update(req.params.id, req.body).then(x => {
    res.status(200).send({message: "User successfully updated"});
  }).catch(e => {
    res.status(400).send({message: "Failed to update user data", data: e});
  })

}

exports.delete = (req, res, next) => {
  repository.delete(req.body.id).then(x => {
    res.status(200).send({message: "User successfully removed"});
  }).catch(e => {
    res.status(400).send({message: "Failed to remove user", data: e});
  })
}

exports.refreshToken = async (req, res, next) => {
  const token = authService.getTokenRequest(req);
  authService.decodeToken(token).then(data => {

     repository.getById(data.id).then(user => {
       if (!user) res.status(404).send({message: 'User not found'});

        authService.generateToken({id: user._id, email: user.email, name: user.name, roles: user.roles}).then(newToken => {
           res.status(201).send({
             token: newToken,
             data: {
               email: user.email,
               name: user.name
             }
         });

       }).catch(e => res.status(500).send({message: 'Failed to process your request'}));
     })
     })
}
