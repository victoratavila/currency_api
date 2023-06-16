const express = require('express');
const CurrenciesHistory = require('../Models/currencies_history');
const sequelize = require('sequelize');

const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {

    
    async getHistoryByCurrency(req, res){

        const { currencyName, period } = req.params;

        const datesURL = `https://www.melhorcambio.com/dolar_hoje/get_eixo_x.php?idmoeda=8&periodo=${period}`
        const valuesURL = `https://www.melhorcambio.com/dolar_hoje/get_comercial.php?idmoeda=8&periodo=${period}`

        axios.get(datesURL).then(dates => {
            
            axios.get(valuesURL).then(values => {

                const result = {}

                for(i = 0; i < dates.data.length && i < values.data.length ; i++){
                    result[`${dates.data[i]}`] = parseFloat(values.data[i])
                }

                res.json(result);

            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err)
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