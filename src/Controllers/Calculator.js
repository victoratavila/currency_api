const express = require('express');
const sequelize = require('sequelize');
const Currency = require('../Models/currency');

module.exports = {
    async Calculator(req, res){
        const { from_currency_code, from_currency_value, to_currency_code } = req.body;

        await Currency.findOne({
            where: {
                code: from_currency_code
            }
        }).then(from => {
      
        
            if(from == undefined || from == null){
                res.status(400).json({error: `Invalid currency code informed, please try again`});
            } else {
                Currency.findOne({
                    where: {
                        code: to_currency_code
                    }
                }).then((to) => {

                    if(to == undefined || to == null){
                        res.status(400).json({error: `Invalid currency code informed, please try again`});
                    } else {
                        if(from_currency_value == undefined || from_currency_value == null || typeof from_currency_value != 'number'){
                            res.status(400).json({error: `Please inform a valid and numeric number to calculate from`});
                        } else {

                            if(from_currency_code == to_currency_code){
                                res.status(400).json({error: 'Please provide different currency codes to convert'})
                            } else {
                        
                                const from_currency_price = from.dataValues.value;
                                const to_currency_price = to.dataValues.value;
                                const from_currency_symbol = from.dataValues.symbol;
                                const to_currency_symbol = to.dataValues.symbol;
    
                                const convertedResult = ((from_currency_price * from_currency_value)/to_currency_price).toFixed(2);
                                res.status(200).json({
                                    "converted_from": from_currency_code.toUpperCase(),
                                    "converted_from_symbol": from_currency_symbol,
                                    "value_converted": from_currency_value,
                                    "to_currency": to_currency_code.toUpperCase(),
                                    "to_currency_code": to_currency_symbol,
                                    "result": convertedResult
                                })
                       
                            }
                
                        }
                    }
                })
            }

        })

    }
}