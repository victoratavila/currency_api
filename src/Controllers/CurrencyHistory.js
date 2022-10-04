const express = require('express');
const CurrenciesHistory = require('../Models/currencies_history');
const sequelize = require('sequelize');

module.exports = {

    
    async getHistory(req, res){
        CurrenciesHistory.findAll().then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
        })
    },

    async registerHistory(req, res){

        const { currency, slug, value, code, symbol, date } = req.body;
        
        await CurrenciesHistory.create({
            currency: currency,
            slug: slug,
            value: value,
            code: code,
            symbol: symbol,
            date: date
        }).then(() => {
            res.status(200).json({result: `New currency history registered for the currency ${currency}`})
        }).catch(err => {
            console.log(err);
        })
    }


}