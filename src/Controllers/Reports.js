const express = require('express');
const currency = require('../Models/currency');
const previousdayvalues = require('../Models/previousdayvalues');
const percentage = require('calculate-percentages');
const redis = require('redis');
const REDIS_URL = process.env.REDIS_URL || 6379;
const client = redis.createClient(REDIS_URL);

module.exports = {
    async compareValues(req, res){

        let results = {}

        await currency.findAll({
            attributes: ['currency', 'value', 'lastUpdate', 'slug']
         }).then(currencies => {

           previousdayvalues.findAll({
            attributes: ['currency', 'value', 'lastUpdate', 'slug']
           }).then(yerterdayCurrencies => {

            for(let i = 0; i < currencies.length; i++){
      
              let yesterdayValue = currencies[i].dataValues.value;
              let todayValue = yerterdayCurrencies[i].dataValues.value;

              let currencyName = currencies[i].dataValues.slug;

              if(todayValue > yesterdayValue){
                  let difference = (percentage.differenceBetween(todayValue, yesterdayValue)).toFixed(0);

                  results[currencyName] = `${difference}%`;

              } else {
                let difference = (percentage.differenceBetween(todayValue, yesterdayValue)).toFixed(0);

                results[currencyName] = `${difference}%`;
              }
            }

            res.json(results)
           }).catch(err => {
               console.log(err);
           })


         }).catch(err => {
             console.log(err);
         });
    }
}
