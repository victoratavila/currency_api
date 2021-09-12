const express = require('express');
const currency = require('../Models/currency');
const previousdayvalues = require('../Models/previousdayvalues');

module.exports = {
    async compareValues(req, res){
        await currency.findAndCountAll({
            attributes: ['currency', 'value']
         }).then(currencies => {

           previousdayvalues.findAll({
            attributes: ['currency', 'value']
           }).then(yerterdayCurrencies => {

            res.json(currencies);
     
           }).catch(err => {
               console.log(err);
           })


         }).catch(err => {
             console.log(err);
         });
    }
}
