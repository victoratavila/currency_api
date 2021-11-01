const express = require('express');
const jwt = require('jsonwebtoken');
const { secret, GENERAL_TOKEN } = process.env;

const authAdmin = (req, res, next) => {
    const token = req.headers.token;

    // if(token != undefined && token != "" && token != null){
    //     jwt.verify(token, secret, (err, data) => {
    //         if(err){
    //            
    //         } else {
    //             next();
    //         }
    //     });
    // } else {
    //     res.status(403).json({error: 'Please provide a token to access this resource'});
    // }

    if(token != undefined && token != "" && token != null){
        if(token == GENERAL_TOKEN){
            next();
        } else {
            res.status(403).json({error: 'Access denied. Please provide a valid token to access this resource'});
        }
    } else {
            res.status(400).json({error: 'Please provide a token to access this resource'})
    }

    

}

module.exports = authAdmin;