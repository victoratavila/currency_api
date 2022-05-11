const express = require('express');
const CurrenciesHistory = require('../Models/currencies_history');
const sequelize = require('sequelize');

module.exports = {

    async registerHistory(req, res){
        await CurrenciesHistory.create({
            currency: 'Dólar',
            slug: 'dolar',
            value: 'USD',
            code: 'USD',
            symbol: '$',
            date: '29/04/2022'
        }).then(() => {
            console.log('criado')
        }).catch(err => {
            console.log(err);
        })
    },

    async getHistory(req, res){
        await CurrenciesHistory.findAll({
            where: {
                code: 'USD'
            }
        }).then(data => {
            console.log(data)
            res.status(200).json(data);
        }).catch(err => {
            console.log(err);
        })
    }

}