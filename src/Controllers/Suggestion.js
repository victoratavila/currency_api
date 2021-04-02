const express = require('express');
const sendMail = require('../Mail/sender');
const suggestion = require('../Models/suggestion');

module.exports = {

    async getSuggestions(req, res){
        await suggestion.findAll().then(suggestion => {
            res.json(suggestion);
        }).catch(err => {
            console.log(err);
        })
    },
    
    async sendSuggestion(req, res){

        const { email, username, suggestionSent } = req.body;
        console.log(email)
        if(email == undefined || username == undefined || suggestionSent == undefined || email == ''){
            res.status(400).json({error: 'Please inform e-mail, username and suggestion to register'});
        } else {

            await suggestion.create({
                email: email,
                username: username,
                suggestion: suggestionSent
            }).then(() => {
    
                    try {
                        // sendMail(
                        //     // Sender name
                        //     'Conversor de moeda', 
                        //     // Sender email
                        //     'contato@conversordemoeda.xyz', 
                        //     // Recipient
                        //     `${email}`, 
                        //     // Subject
                        //     `Sua sugestão foi recebida, ${username}! 💚`, 
                        //       // Content
                        //     `Olá, ${username}! Passando aqui para te avisar que sua sugestão foi enviada com sucesso e está sendo analisada internamente por nossos desenvolvedores, agradecemos sua sugestão e pedimos que fique ligada nas nossas novidades, grandes coisas vem por aí! <3`
                        // )
                
                        res.status(200).json({result: 'E-mail successfully sent to ' + email})
                    } catch (err) {
                        console.log(err);
                    }
                
            }).catch(err => {
                console.log(err);
            })
    
        
        }

  
}}
