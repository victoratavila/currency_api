const express = require('express');
const User = require('../Models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

    async createUser(req, res){
        const data = { email, password, admin } = req.body;
    
        if(data.email  != null && data.password != null && data.admin != null){

            User.findOne({
                
             where : {
                email: data.email
             }
            
            }).then(result => {
                
                if(result == null){


                    bcrypt.hash(data.password, saltRounds, function(err, hash) {
                        if(err) {
                            console.log(err);
                        }
                        if(hash){
                            User.create({email: data.email, password: hash, admin: data.admin}).then(() => {

                                res.status(200).json({result: 'New user successfully created'});
                            }).catch(err => {
                                console.log(err);
                            })
                        }
                    });
           
                    
                } else {
                    res.status(400).json({result: 'There is already an user with this email, try a new one to register'});
                }

            }).catch(err => {
                console.log(err);
            })
        
       

        } else {
            res.status(400).json({result: 'Provide all login details to create a new user'});
        }
        
    }
}