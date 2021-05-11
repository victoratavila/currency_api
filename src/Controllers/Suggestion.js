const express = require('express');
const sendMail = require('../Mail/sender');
const suggestion = require('../Models/suggestion');
const validator = require("email-validator");

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
        const emailValidator = validator.validate(email); 
        
        if(username == undefined || username == "" || suggestionSent == undefined || suggestionSent == ""){
            res.status(400).json({error: 'Por favor informe o seu nome e a cotação que gostaria de sugerir'});
        } else {

            if(emailValidator == false){
                res.status(400).json({error: 'Por favor informe um e-mail válido!'});
            } else {
                await suggestion.create({
                    email: email,
                    username: username,
                    suggestion: suggestionSent
                }).then((response) => {
                        try {
                            // sendMail(
                            //     // Sender name
                            //     'Conversor de moeda', 
                            //     // Sender email
                            //     'contato@conversordemoeda.xyz', 
                            //     // Recipient
                            //     `${email.trim()}`, 
                            //     // Subject
                            //     `Sua sugestão foi recebida, ${username.trim()}! 💚`, 
                            //       // Content
                            //     `Olá, ${username}! Passando aqui para te avisar que sua sugestão foi enviada com sucesso e está sendo analisada internamente por nossos desenvolvedores, agradecemos sua sugestão e pedimos que fique ligada nas nossas novidades, grandes coisas vem por aí! <3`
                            // )
                    
                            res.status(200).json({result: 'Sugestão enviada com sucesso! Você receberá uma confirmação no e-mail ' + email})
                        } catch (err) {
                            console.log(err);
                            res.status(200).result({result: 'Sugestão enviada com sucesso!'})
                        }
                    
                }).catch(err => {
                    console.log(err);
                })
            }
        
    }
  
},

        async sendNewsletter(req, res){
            await suggestion.findAll({attributes: ['email']}).then(response => {
               let recipients = [];

               // Create a single array with all the recipients
               response.forEach( async data => {
                   let checkedEmail = data.dataValues.email;
                   if(recipients.includes(checkedEmail)){
                   } else {
                        recipients.push(checkedEmail);
                   }
               });
               

               try {
                sendMail(
                    // Sender name
                    'Conversor de moeda', 
                    // Sender email
                    'contato@conversordemoeda.xyz', 
                    // Recipient
                    recipients, 
                    // Subject
                    `Sua sugestão foi recebida! 💚`, 
                      // Content
                    `Olá! Passando aqui para te avisar que sua sugestão foi enviada com sucesso e está sendo analisada internamente por nossos desenvolvedores, agradecemos sua sugestão e pedimos que fique ligada nas nossas novidades, grandes coisas vem por aí! <3`
                )
        
                res.status(200).json({result: 'Newsletter successfully sent to the list'});
            } catch (err) {
                console.log(err);
            }

            })
        }

}
