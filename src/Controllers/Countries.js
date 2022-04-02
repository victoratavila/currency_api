const express = require('express');
const CountriesCurrencies = require('../Models/countries_currencies');
const Currency = require('../Models/currency');
var slugify = require('slugify');

module.exports = {
    
    async getAll(req, res){
        await CountriesCurrencies.findAll({}).then(data => {
            res.status(200).json(data);
        }).catch(err => {
            console.log(err);
        })
    },

    async createCountry(req, res){
        const data = { country_name, main_currency_name, main_currency_code} = req.body;

        if (
         data.country_name !== null && data.country_name !== undefined 
         && data.main_currency_name !== null && data.main_currency_name !== undefined 
         && data.main_currency_code !== null  && data.main_currency_code !== undefined 
        )
        {

           await CountriesCurrencies.findOne({
                where: {
                    country_name: data.country_name
                }
            }).then(result => {

                if(result == null){

                    data.main_currency_slug = slugify(main_currency_name, {
                        replacement: '-',
                        lower: true
                    })

                    data.main_currency_code = data.main_currency_code.toUpperCase();

                    CountriesCurrencies.create(data).then(() => {
                        res.status(200).json({result: `Country ${data.country_name} successfully registered`})
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    res.status(400).json({error: `There is already a country registered with the name ${data.country_name}`})
                }
                
            })

          
          

        } else {
            res.status(400).json({error: 'Please provide all needed data to register a country'})
        }
        

    },

    async searchCountryByCurrency(req, res){

        const { currency_code } = req.params; 

        await CountriesCurrencies.findAll({
            where: {
                main_currency_code: currency_code
            }
        }).then(data => {

            if(data.length > 0) {
                res.status(200).json({
                    countries_amount: data.length,
                    data: data
                });
            } else {
                res.status(200).json({
                    countries_amount: data.length,
                    result: `No countries registered related to the currency code ${currency_code} yet`
                })
            }
         

        }).catch(err => {
            console.log(err);
        })
    }

}