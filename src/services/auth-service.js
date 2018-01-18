'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config.json');

exports.generateToken = async (data) => {
  return jwt.sign(data, config.token_secret, {expiresIn: '1d'});
}

exports.decodeToken = async (token) => {
  var data = await jwt.verify(token, config.token_secret);
  return data;
}
exports.getTokenRequest = (req) => {
  return  req.body.token || req.query.token || req.headers['x-access-token'];
};
exports.authorize = (req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    res.status(401).json({message: 'Restricted access'});
  } else {
    jwt.verify(token,config.token_secret, function(error, decoded) {
      if (error) {
        res.status(401).json({message: 'Invalid Token'});
      } else {
        next();
      }
    });
  }
};

exports.isAdmin = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    res.status(401).json({message: 'Invalid Token'});
  } else {
    jwt.verify(token, config.token_secret, function(error, decoded) {
      if (error) {
        res.status(401).json({message: 'Invalid Token'});
      } else {
        if (decoded.roles.includes('admin')) {
          next();
        } else {
          res.status(403).json({message: "This feature is restricted for administrators"});
        }
      }
    });
  }
};
