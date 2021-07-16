const express = require('express');
const sendMail = require('../Mail/sender');
const suggestion = require('../Models/suggestion');
const validator = require("email-validator");
const Suggestion = require('../Models/suggestion');
const newsletterToken = process.env.NEWSLETTER_TOKEN;

module.exports = {

    async getSuggestions(req, res){
        await suggestion.findAll().then(suggestion => {
            res.json(suggestion);
        }).catch(err => {
            console.log(err);
        })
    },

    async getSuggestionPage(req, res){

        const { num } = req.params; 
        var offset;

        if(isNaN(num) || num == 1){
            var offset = 0;
        } else {
            var offset = (parseInt(num) - 1) * 4;
        }

        Suggestion.findAndCountAll({
            where: {
                status: 'pending'
             },
             offset: offset,
             limit: 4
        }).then(suggestion => {

            var next;
            if(offset + 4 >= suggestion.count){
                next = false;
            } else {
                next = true;
            }

            const amount = suggestion.count;
            const pages = amount % 4;

            if(pages == 0){
                var amountOfPages = amount/4;
            } else {
                var amountOfPages = Math.ceil(amount/4);
            }

            const result = {
                maxPages: amountOfPages,
                next: next,
                suggestion: suggestion,
            }

            console.log(amountOfPages);

            res.json(result);
        }).catch(err => {
            console.log(err);
        });

        
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
                    suggestion: suggestionSent,
                    status: "pending"
                }).then((response) => {
                        try {
                            sendMail(
                                // Sender name
                                'Conversor de moeda', 
                                // Sender email
                                'contato@conversordemoeda.xyz', 
                                // Recipient
                                `${email.trim()}`, 
                                // Subject
                                `Sua sugestão foi recebida, ${username.trim()}! 💚`, 
                                  // Content
                                `Olá, ${username}! Passando aqui para te avisar que sua sugestão foi enviada com sucesso e está sendo analisada internamente por nossos desenvolvedores, agradecemos sua sugestão e pedimos que fique ligada nas nossas novidades, grandes coisas vem por aí! <3`
                            )
                    
                            res.status(200).json({result: 'Sugestão enviada com sucesso! Você receberá uma confirmação no e-mail ' + email})
                        } catch (err) {
                            console.log(err);
                        }
                    
                }).catch(err => {
                    console.log(err);
                })
            }
        
    }
  
},

        async sendNewsletter(req, res){
            const token = req.body.token;

            if(token != newsletterToken){
                res.status(403).json({error: 'invalid token provided'});
            } else {
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
                         `Sua sugestão foi recebida com sucesso! 💚`, 
                           // Content
                         `Olá! Passando aqui para te avisar que sua sugestão foi enviada com sucesso e está sendo analisada internamente por nossos desenvolvedores, agradecemos sua sugestão e pedimos que fique ligada nas nossas novidades, grandes coisas vem por aí! <3`
                     )
             
                     res.status(200).json({result: `Newsletter successfully sent to the newsletter list with ${recipients.length} recipients`});
                 } catch (err) {
                     console.log(err);
                 }
     
                 })

            }
        
        },

        async approveOrReject(req, res){
            const { id } = req.params;
            const { status } = req.body;

            await Suggestion.findOne({

                where: {
                    id: id
                }

            }).then(response => {

                if(response == null){
                    res.status(400).json({result: 'Please provide an existing suggestion ID to approve or reject'});
                } else {
                    if(status == null || status == undefined || status == ""){
                        res.status(400).json({result: 'Please provide the status of this suggestion to update it'});
                    } else {
                        Suggestion.update({
                            status: status
                        }, { where: {
                            id: id
                        }}).then(result => {
                            res.status(200).json({result: `Status of the suggestion ${response.suggestion} updated to ${status}`})
                        }).catch(err => {
                            console.log(err);
                        })
                    }
                }
  
            }).catch(err => {
                console.log(err);
            })
        }

}
