const express = require('express');
const jwt = require('jsonwebtoken');
const { secret } = process.env;

const authAdmin = (req, res, next) => {
    const token = req.headers.token;

    if(token != undefined && token != "" && token != null){
        jwt.verify(token, secret, (err, data) => {
            if(err){
                res.status(403).json({error: 'Please provide a valid token to access this resource'});
            } else {
                next();
            }
        });
    } else {
        res.status(403).json({error: 'Please provide a token to access this resource'});
    }

}

module.exports = authAdmin;