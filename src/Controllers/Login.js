const express = require('express');
const User = require('../Models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');

module.exports = {

    async login(req, res){

        const data = { email, password, admin } = req.body;
        
        if(data.email  != null && data.password != null && data.admin != null){

            User.findOne({
                
             where : {
                email: data.email
             }
            
            }).then(result => {
                
                if(result == null){

                    res.status(403).json({result: 'No user found related to the provided e-mail'});
                    
                } else {

                       const dbPassword = result.dataValues.password;

                       async function checkDetails() {
                            const match = await bcrypt.compare(data.password, dbPassword);
                        
                            if(match) {
                                

                               const token = jwt.sign({
                                    email: data.email,
                                    admin: data.admin,
                                    id: data.id
                                }, secret , { expiresIn: '1h' });

                                res.status(200).json({token: token});
                            } else {
                                res.status(403).json({result: 'E-mail or password incorrect'});
                            }
                        }
                    
                        checkDetails();     
                }

            }).catch(err => {
                console.log(err);
            })
        
        } else {
            res.status(400).json({result: 'Provide all login details to login'});
        }
        
    } 
    
}