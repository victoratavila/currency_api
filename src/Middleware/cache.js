const express = require('express');
const redis = require('redis');
const { getSuggestionPage } = require('../Controllers/Suggestion');

const REDIS_URL = process.env.REDIS_URL || 6379;
const client = redis.createClient(REDIS_URL);

module.exports = {
     async getAllCache(req, res, next){
        client.get('currency', (err, currency) => {
            if(err) {
                console.log(err);
            }
    
            if(currency !== null){
                res.json(JSON.parse(currency));
            } else {
                next();
            }
        })
    },

    async getAllByOrder(req, res, next){

        const { order } = req.params;

        client.get(order, (err, currency) => {
            if(err) {
                console.log(err);
            }
    
            if(currency !== null){
                res.json(JSON.parse(currency));
            } else {
                next();
            }
        })
    },

    async getCurrencyIncluding(req, res, next){

        const { currencyName } = req.params;

        client.get(currencyName, (err, currency) => {
            if(err) {
                console.log(err);
            }
    
            if(currency !== null){
                res.json(JSON.parse(currency));
            } else {
                next();
            }
        })
    },

    async getCurrencyByCode(req, res, next){

        const { code } = req.params;

        client.get(code, (err, currency) => {
            if(err) {
                console.log(err);
            }
    
            if(currency !== null){
                res.json(JSON.parse(currency));
            } else {
                next();
            }
        })
    },

    async getSuggestionPage(req, res, next){
        const { num } = req.params;

        client.get(`page${num}`, (err, currency) => {
            if(err) {
                console.log(err);
            }
    
            if(currency !== null){
                res.json(JSON.parse(currency));
    
            } else {
                next();
            }
        })
    }
}

