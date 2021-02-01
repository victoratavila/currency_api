const express = require('express');
const currency = require('../Models/currency');
const sequelize = require('sequelize');
var slugify = require('slugify');

module.exports = {

    // Get all currencies
    async getAll(req, res){
        await currency.findAll({
            order: [
                ['currency', 'ASC']
            ]
        }).then(currency => {
            res.json(currency);
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
        }).then((dolar) => {

            if(dolar == undefined || dolar == [] || dolar == null){
                res.status(404).json({error: 'Currency not found'});
            } else {
                res.json(dolar);
            }
       
        }).catch(err => {
            console.log(err);
        })

    },

    // Create new currency 
    async createCurrency(req, res){

        const { currencyName, value, code, symbol, lastUpdate } = req.body;

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
                    currency: slugify(currencyName, {
                        replacement: '-',
                        lower: true
                    }),
                    value: value,
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
        const { currencyName, value, lastUpdate } = req.body;

        await currency.update({

            currency: slugify(currencyName, {
                replacement: '-',
                lower: true
            }),
            value: value,
            lastUpdate: lastUpdate
            
        }, {
            where: {
                currency: slugify(currencyName, {
                    replacement: '-',
                    lower: true
                })
            }
        }).then(() => {
            res.json({result: `${currencyName} was successfully updated`});
        }).catch(err => {
            console.log(err);
        })
    }

}