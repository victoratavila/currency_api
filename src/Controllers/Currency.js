const express = require('express');
const currency = require('../Models/currency');
const sequelize = require('sequelize');
var slugify = require('slugify');
const redis = require('redis');
const previousdayvalues = require('../Models/previousdayvalues');

const REDIS_URL = process.env.REDIS_URL || 6379;
const client = redis.createClient(REDIS_URL);

module.exports = {

    async getAll(req, res){
        await currency.findAll({
            order: [
                ['currency', 'ASC']
            ]
        }).then(currency => {
            res.json(currency);
            client.setex('currency', 3600, JSON.stringify(currency));
        }).catch(err => {
            console.log(err);
        })
    },

    async getAllFromYesterday(req, res){
        await previousdayvalues.findAll({
            order: [
                ['currency', 'ASC']
            ]
        }).then(currency => {
            res.json(currency);
            client.setex('currency', 3600, JSON.stringify(currency));
        }).catch(err => {
            console.log(err);
        })
    },

    // Get all currencies by order
    async getAllByOrder(req, res){

        const { order } = req.params;

        if(order == 'lower'){
            await currency.findAll({
                order: [
                    ['value', 'ASC']
                ]
            }).then(currency => {
                res.json(currency);
                client.setex('lower', 3600, JSON.stringify(currency));
            }).catch(err => {
                console.log(err);
            })
        }

        if(order == 'higher'){
            await currency.findAll({
                order: [
                    ['value', 'DESC']
                ]
            }).then(currency => {
                res.json(currency);
                client.setex('higher', 3600, JSON.stringify(currency));
            }).catch(err => {
                console.log(err);
            })
        }

    },

    async getCurrencyIncluding(req, res){
        const {currencyName} = req.params;

        currency.findAll({
            where: {
                currency: sequelize.where(sequelize.fn('LOWER', sequelize.col('currency')), 'LIKE', '%' + currencyName + '%')
            }
        }).then(result => {

            if(result){
                res.json(result);
                client.setex(currencyName, 3600, JSON.stringify(result));
            } else {
                res.json({result: 'not found'})
            }
        
        }).catch(err => {
            console.log(err);
        })
    },


    // Get currency by name
    async getCurrency(req, res){
        const { currencyName } = req.params;

        currency.findAll({
            where: {
                currency: slugify(currencyName, {
                    replacement: '-',
                    lower: true
                })
            }
        }).then((currency) => {

            if(currency == undefined || currency == [] || currency == null){
                res.status(404).json({error: 'Currency not found'});
            } else {
                res.json(dolcurrencyar);
            }
       
        }).catch(err => {
            console.log(err);
        })

    },

    // Create new currency 
    async createCurrency(req, res){

        const { currencyName, slug, value, code, symbol, lastUpdate } = req.body;

        await currency.findOne({
            where: {
                currency: slugify(currencyName, {
                    replacement: '-',
                    lower: true
                })
            }
        }).then( async (result) => {
            if(result){
                res.status(400).json({err: 'This currency was already registered'})
            } else {
                await currency.create({
                    currency: currencyName,
                    value: value,
                    slug: slugify(currencyName, {
                        replacement: '-',
                        lower: true
                    }),
                    code: code,
                    symbol: symbol,
                    lastUpdate: lastUpdate
                }).then(() => {
                    res.json({result: 'Currency successfully created'});
                }).catch(err => {
                    console.log(err);
                })
            }
        })
    
        
    },

    // Update values
    async updateCurrency(req, res){
        const { slug, value, lastUpdate } = req.body;

        await currency.update({

            slug: slug,
            value: value,
            lastUpdate: lastUpdate
            
        }, {
            where: {
                slug: slug
            }
        }).then(() => {
            res.json({result: `${slug} was successfully updated`});
        }).catch(err => {
            console.log(err);
        })
    },

      // Update values
      async updatePreviousDayCurrency(req, res){
        const { slug, value, lastUpdate } = req.body;

        await previousdayvalues.update({

            slug: slug,
            value: value,
            lastUpdate: lastUpdate
            
        }, {
            where: {
                slug: slug
            }
        }).then(() => {
            res.json({result: `${slug} was successfully updated`});
        }).catch(err => {
            console.log(err);
        })
    },

    async searchByCode(req, res){
        const { code } = req.params;

        await currency.findOne({
            where: {
                code: slugify(code, {
                    replacement: '-',
                    lower: true
                })
            }
        }).then( currency => {

            if(currency == null){
                res.status(404).json({error: `Currency related to the code ${code} not found`});
            } else {
                res.json(currency);
                client.setex(code, 3600, JSON.stringify(currency));
            }
           
        }).catch(err => {
            console.log(err);
        })
    },

    async searchMainCurrency(req, res){
        await currency.findAll({
            where: {
                slug: ['dolar', 'euro', 'libra']
            }
        }).then(response => {
            res.json(response);
        }).catch(err => {
            console.log(err);
        })
    },

    async status(req, res){
        const process = {
            "status": true
        }
        res.json(process);
    },

    async invalidRoute(req, res){
        res.status(404).json({error: 'This is not a valid endpoint'});
    },

    async searchBySlug(req, res){

        const { slug } = req.params;

        await currency.findOne({
            where: {
                slug: slug
            }
        }).then(result => {

           console.log(result);
           if(result == null){
               res.status(404).json({error: `No registers found related to the slug ${slug}`});
           } else {
               res.status(200).json(result.dataValues);
           }
          
        }).catch(err => {
            console.log(err);
        })
    }

}