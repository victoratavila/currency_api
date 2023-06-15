const express = require('express');
const sendMail = require('../Mail/sender');
const sendNewsletter = require('../Mail/newsletter');
const suggestion = require('../Models/suggestion');
const validator = require("email-validator");
const Suggestion = require('../Models/suggestion');
const newsletterToken = process.env.NEWSLETTER_TOKEN;
const Newsletter_user = require('../Models/newsletterUsers');

// const redis = require('redis');
// const REDIS_URL = process.env.REDIS_URL || 6379;
// const client = redis.createClient(REDIS_URL);

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


            res.json(result);
            // client.setex(`page${num}`, 600, JSON.stringify(result));

        }).catch(err => {
            console.log(err);
        });

        
    },

    async signNewsletter(req, res){

        const { name, email, assigned_newsletter } = req.body;

        Newsletter_user.findOne({where: {email: email}}).then((data) => {
            if(data){
                res.status(403).json({error: `There is already an user related to the e-mail ${email}`});
            } else {
                Newsletter_user.create({
                    name: name,
                    email: email,
                    assigned_newsletter: assigned_newsletter
                }).then(() => {
                    res.status(200).json({result: 'User sucessfully added to newsletter list'});
                }).catch(err => {
                    console.log(err);
                })
            }
        }).catch(err => {
            console.log(err);
        })

      
    },
    
    async sendSuggestion(req, res){

        const { email, username, suggestionSent, assigned_newsletter } = req.body;
        const emailValidator = validator.validate(email); 
        
        if(username == undefined || username == "" || suggestionSent == undefined || suggestionSent == ""){
            res.status(400).json({error: 'Por favor informe o seu nome e a cotação que gostaria de sugerir'});
        } else {

            if(emailValidator == false){
                res.status(400).json({error: 'Por favor informe um endereço de e-mail válido!'});
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
                                'Cotações de hoje', 
                                // Sender email
                                'contato@cotacoesdehoje.com.br', 
                                // Recipient
                                `${email.trim()}`, 
                                // Subject
                                `Sua sugestão foi recebida, ${username.trim()}! 💚`, 
                                  // Content
                                `Olá, ${username}! Passando aqui para te avisar que sua sugestão foi enviada com sucesso e está sendo analisada internamente por nossos desenvolvedores, agradecemos sua sugestão e pedimos que fique ligada nas nossas novidades, grandes coisas vem por aí! <3`
                            )


                            Newsletter_user.findOne({where: {email: email}}).then((data) => {
                                if(data){
                                    res.status(200).json({result: 'Sugestão enviada com sucesso! Você receberá uma confirmação no e-mail ' + email + ', e-mail já está na lista de newsletter'});
                                } else {

                                    if(assigned_newsletter === true){
                                        Newsletter_user.create({
                                            name: username,
                                            email: email,
                                            assigned_newsletter: assigned_newsletter || false
                                        }).then(() => {
                                            res.status(200).json({result: 'Sugestão enviada com sucesso! Você receberá uma confirmação no e-mail ' + email, assigned_newsletter: true});
                                        }).catch(err => {
                                            console.log(err);
                                        })
                                    } else {
                                        res.status(200).json({result: 'Sugestão enviada com sucesso! Você receberá uma confirmação no e-mail ' + email, assigned_newsletter: false});
                                    }
        
                                }
                            }).catch(err => {
                                console.log(err);
                            })
                    
                            
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

            const { token, newsletterText, subject} = req.body;

                await Newsletter_user.findAll({attributes: ['email']}).then(response => {
                    let recipients = [];
     
                    // Create a single array with all the recipients
                    response.forEach( async data => {
                        let checkedEmail = data.dataValues.email;
                        if(recipients.includes(checkedEmail)){
                        } else {
                             recipients.push(checkedEmail);
                             try {
                                sendNewsletter(
                                 // Sender name
                                 'Cotações de hoje', 
                                 // Sender email
                                 'newsletter@cotacoesdehoje.com.br', 
                                 // Recipient
                                 checkedEmail, 
                                 // Subject
                                 subject, 
                                   // Content
                                 '',
                                 // NewsletterText
                                 newsletterText
                             )
                    
                         } catch (err) {
                             console.log(err);
                         }
                        }

                    });
     
                    res.status(200).json({result: `Newsletter successfully sent to the newsletter list`});
     
                 })
        
        },

        async cancelNewsletterSubscription(req, res){
            const { email } = req.params;

            if(email == undefined || email == null || email == ""){
                res.json(404).json({error: 'Please inform an e-mail to cancel newsletter subscription'});
            } else {

                Newsletter_user.findOne({
                    raw: true,
                    where: {
                        email: email
                    }
                }).then((data) => {

                    if(data != undefined && data != null){

                        Newsletter_user.destroy({
                            where: {
                                email: email
                            }
                        }).then(() => {
                            res.status(200).json({result: `Newsletter subscription cancelled for the e-mail ${email}, the user will no longer receive newsletter messages`})
                        }).catch(err => {
                            console.log(err);
                        })
                      
                    } else {
                        res.status(404).json({error: `Newsletter subscription not found related to the e-mail ${email}`});
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
    

        },

        async listNewsletterUsers(req, res){
            Newsletter_user.findAll().then(data => {
                res.json(data);
            }).catch(err => {
                console.log(err);
            })
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

                        if(status == "rejected"){
                            Suggestion.destroy({
                                where: {
                                    id: id
                                }
                            }).then(() => {
                                res.status(200).json({result: `Suggestion ${id} successfully deleted from database`});
                            }).catch(err => {
                                console.log(err);
                            });

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
                }
  
            }).catch(err => {
                console.log(err);
            })
        }

}
