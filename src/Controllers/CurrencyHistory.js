const express = require('express');
const CurrenciesHistory = require('../Models/currencies_history');
const sequelize = require('sequelize');

const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {

    
    async getHistoryByCurrency(req, res){

        const { currencyName, period } = req.params;

        currencyId = {
            dolar: 8,
            euro: 11,
            libra: 15,
            dolar_canadense: 7,
            dolar_australiano: 6,
            iene: 14,
            peso_mexicano: 25,
            shekel: 28,
            franco_suico: 12,
            peso_chileno: 18,
            peso_argentino: 19,
            peso_colombiano: 32
        }
        
        const formatedCurrencyName = currencyName.replace('-', '_')

        console.log(formatedCurrencyName)

        const datesURL = `https://www.melhorcambio.com/dolar_hoje/get_eixo_x.php?idmoeda=${currencyId[formatedCurrencyName]}&periodo=${period}`
        const valuesURL = `https://www.melhorcambio.com/dolar_hoje/get_comercial.php?idmoeda=${currencyId[formatedCurrencyName]}&periodo=${period}`

        axios.get(datesURL).then(dates => {
            
            axios.get(valuesURL).then(values => {

                const result = {}

                for(i = 0; i < dates.data.length && i < values.data.length ; i++){

                    console.log(dates.data[i])

                    if(dates.data[i].includes('<br>')){
                        result[`${dates.data[i].replace('<br>', ' - ')}`] = parseFloat(values.data[i])
                    } else {
                        result[`${dates.data[i]}`] = parseFloat(values.data[i])
                    }
                 
                }

                res.status(200).json({
                    currencyName: currencyName,
                    result
                });

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