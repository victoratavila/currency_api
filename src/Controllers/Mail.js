const express = require('express');
const sendMail = require('../Mail/sender');

module.exports = {
    async sendSuggestion(req, res){

        const { email } = req.body;

        if(email == undefined){
            res.status(400).json({result: 'Please provide an receiver for this e-mail sending'});
        } else {
            try {
                sendMail(
                    // Sender name
                    'Conversor de moeda', 
                    // Sender email
                    'contato@conversordemoeda.xyz', 
                    // Recipient
                    `${email}`, 
                    // Subject
                    `Sugestão recebida!`, 
                )
        
                res.status(200).json({result: 'E-mail successfully sent to ' + email})
            } catch (err) {
                console.log(err);
            }
        }   
  
}}
