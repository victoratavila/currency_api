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
                                    
                                    "result": convertedResult,
                                    details: {
                                        "converted_from": from_currency_code.toUpperCase(),
                                        "converted_from_symbol": from_currency_symbol,
                                        "converted_to_code": to_currency_code.toUpperCase(),
                                        "converted_to_symbol": to_currency_symbol,
                                        "value_converted": from_currency_value
                                    }
                                })
                       
                            }
                
                        }
                    }
                })
            }

        })

    },

    async realCalculator(req, res){

        const { convert_from_amount, to_currency_code, inverse } = req.body;

        if(convert_from_amount == undefined || to_currency_code == undefined){
            res.status(400).json({error: 'Please inform amount to convert from and currency destiny code to convert'});
        } else {
            await Currency.findOne({
                where: {
                    code: to_currency_code
                }
            }).then(result => {
                if(result){

                    if(inverse == undefined || inverse == false){
                        const data = {
                            result: (convert_from_amount/result.value).toFixed(2),
                            details: {
                                converted_amount: convert_from_amount,
                                converted_to_code: result.code,
                                converted_to_symbol: result.symbol,
                                currency_value_per_real: result.value,
                                BRL_to_currency: true
                            }
                        }
    
                        res.json(data);
                    } else {
                        const data = {
                            result: (result.value * convert_from_amount).toFixed(2),
                            details: {
                                converted_amount: convert_from_amount,
                                converted_from_code: result.code,
                                converted_from_symbol: result.symbol,
                                currency_value_per_real: result.value,
                                currency_to_BRL: true
                            }
                        }
    
                        res.json(data);
                    }
                 
                } else {
                    res.status(404).json({error: `Currency not found related to code ${to_currency_code}, please inform a valid currency code`});
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }
}