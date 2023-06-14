const express = require('express');
const currency = require('../Models/currency');
const sequelize = require('sequelize');
var slugify = require('slugify');
const previousdayvalues = require('../Models/previousdayvalues');
const percentage = require('calculate-percentages');
const cronUrls = require('../Models/cron_urls');
const CountriesCurrencies = require('../Models/countries_currencies');

module.exports = {

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

    // async getAllByOrder(req, res){


    //     console.log('oi')


    //     // const { order } = req.params;
    //     // console.log(order)
    //     // res.json(order);

    //     // await currency.findAll({
    //     //     order: [
    //     //         ['currency', 'ASC']
    //     //     ]
    //     // }).then(currency => {
    //     //     res.json(currency);
    //     // }).catch(err => {
    //     //     console.log(err);
    //     // })
    // },

    async getAllFromYesterday(req, res){
        await previousdayvalues.findAll({
            order: [
                ['currency', 'ASC']
            ]
        }).then(currency => {
            res.json(currency);
        }).catch(err => {
            console.log(err);
        })
    },

    async getTodayAndYesterdayValues(req, res){

        const { code } = req.params;

        let finalResult = {
        
            yesterday: {
                date: '',
                currency: '',
                code: '',
                symbol: '',
                value: ''
            },

            today: {
                date: '',
                currency: '',
                code: '',
                symbol: '',
                value: ''
            },

            difference_between: '',
            increased: false
        }
        await currency.findOne({
            where: {
                code: code
            }
        }).then(result => {
            finalResult.today.date = result.lastUpdate;
            finalResult.today.currency = result.currency;
            finalResult.today.code = result.code;
            finalResult.today.symbol = result.symbol;
            finalResult.today.value = result.value;
        
            
            previousdayvalues.findOne({
                where: {
                    code: code
                }
            }).then(yesterdayResult => {

                finalResult.yesterday.currency = yesterdayResult.currency;
                finalResult.yesterday.date = yesterdayResult.lastUpdate;
                finalResult.yesterday.code = yesterdayResult.code;
                finalResult.yesterday.symbol = yesterdayResult.symbol;
                finalResult.yesterday.value = yesterdayResult.value;

                let difference = percentage.differenceBetween(yesterdayResult.value, result.value).toFixed(2);
               
                if(difference == 00){
                       finalResult.difference_between = `${difference}%`;
                       finalResult.increased = 'same';
                   } else {
                    if(difference.charAt(0) != '-'){
                        finalResult.difference_between = `+${difference}%`;
                        finalResult.increased = true;
                     } else {
                        finalResult.difference_between = `${difference}%`;
                        finalResult.increased = false;
                     }
                   }

                res.json(finalResult);
            }).catch(err => {
                console.log(err);
            })

        }).catch(err => {
            console.log(err);
        })
    },

    // Get all currencies by order
    async getAllByOrder(req, res){

        const { order } = req.params;
        const acceptable_orders = ['ascending', 'descending', 'lower' ,'higher', 'random']

        if(acceptable_orders.includes(order)){

            if(order == 'ascending'){
                await currency.findAll({
                    order: [
                        ['currency', 'ASC']
                    ]
                }).then(currency => {
                    res.json(currency);
                }).catch(err => {
                    console.log(err);
                })
            }
    
            if(order == 'descending'){
                await currency.findAll({
                    order: [
                        ['currency', 'DESC']
                    ]
                }).then(currency => {
                    res.json(currency);
                }).catch(err => {
                    console.log(err);
                })
            }
    
            if(order == 'lower'){
                await currency.findAll({
                    order: [
                        ['value', 'ASC']
                    ]
                }).then(currency => {
                    res.json(currency);
                }).catch(err => {
                    console.log(err);
                })
            }
    
            if(order == 'higher'){
                await currency.findAll({
                    order: [
                        ['value', 'DESC']
                    ]
                }).then(currency => {
                    res.json(currency);
                }).catch(err => {
                    console.log(err);
                })
            }
    
            if(order == 'random'){
                await currency.findAll({
                    order: sequelize.literal('rand()')
                }).then(currency => {
                    res.json(currency);
                }).catch(err => {
                    console.log(err);
                })
            }
            
        } else {
            res.status(400).json({error: 'Please provide a valid parameter to order by'});
        } 


    },

    async getCurrencyIncluding(req, res){
        const {currencyName} = req.params;

        currency.findAll({
            where: {
                currency: sequelize.where(sequelize.fn('LOWER', sequelize.col('currency')), 'LIKE', '%' + currencyName + '%')
            }
        }).then(result => {

            if(result){
                res.json(result);
            } else {
                res.json({result: 'not found'})
            }
        
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
        }).then((currency) => {

            if(currency == undefined || currency == [] || currency == null){
                res.status(404).json({error: 'Currency not found'});
            } else {
                res.json(currency);
            }
       
        }).catch(err => {
            console.log(err);
        })

    },

    // Create new currency 
    async createCurrency(req, res){

        const { currencyName, slug, value, code, symbol, lastUpdate, cron_url } = req.body;

        await currency.findOne({
            where: {
                slug: slugify(currencyName, {
                    replacement: '-',
                    lower: true
                })
            }
        }).then( async (result) => {
            if(result){
                res.status(400).json({error: 'This currency was already registered'})
            } else {
                await currency.create({
                    currency: currencyName,
                    value: value,
                    slug: slugify(currencyName, {
                        replacement: '-',
                        lower: true
                    }),
                    code: code,
                    symbol: symbol,
                    lastUpdate: lastUpdate
                }).then( async () => {

                    if(cron_url != null && cron_url != undefined){
                        await cronUrls.create({

                            currency: currencyName,
                            slug: slugify(currencyName, {
                                replacement: '-',
                                lower: true
                            }),

                            cron_url: cron_url

                        }).then(() => {
                            previousdayvalues.create({
                                currency: currencyName,
                                value: value,
                                slug: slugify(currencyName, {
                                    replacement: '-',
                                    lower: true
                                }),
                                code: code,
                                symbol: symbol,
                                lastUpdate: lastUpdate
                            })
                            res.json({result: 'Currency successfully created'});
                        }).catch(err => {
                            console.log(err);
                        })
                    } else {
                        res.status(400).json({error: 'Please provide cron url related to this currency'});
                    }

                  
                }).catch(err => {
                    console.log(err);
                })
            }
        })
    
        
    },

    // Update values
    async updateCurrency(req, res){
        const { slug, value, lastUpdate } = req.body;

        await currency.update({

            slug: slug,
            value: value,
            lastUpdate: lastUpdate
            
        }, {
            where: {
                slug: slug
            }
        }).then(() => {
            res.json({result: `${slug} was successfully updated`});
        }).catch(err => {
            console.log(err);
        })
    },

      // Update values
      async updatePreviousDayCurrency(req, res){
        const { slug, value, lastUpdate } = req.body;

        await previousdayvalues.update({

            slug: slug,
            value: value,
            lastUpdate: lastUpdate
            
        }, {
            where: {
                slug: slug
            }
        }).then(() => {
            res.json({result: `${slug} was successfully updated`});
        }).catch(err => {
            console.log(err);
        })
    },

    async searchByCode(req, res){
        const { code } = req.params;

        await currency.findOne({
            where: {
                code: slugify(code, {
                    replacement: '-',
                    lower: true
                })
            }
        }).then( async currency => {


            await CountriesCurrencies.findAll({

                where: {
                    main_currency_code: slugify(code, { replacement: '-', lower: true })
                },

                attributes: ['country_name'],
                order: [ ['country_name', 'ASC'] ],
                raw: true,
                

            }).then(data => {

                let countries_list = [];

                data.forEach(result => {
                    countries_list.push(result.country_name);
                })

                res.status(200).json({
                    currency: currency,
                    countries_amount: data.length,
                    countries: countries_list
                });
    
            }).catch(err => {
                console.log(err);
            })
           
        }).catch(err => {
            console.log(err);
        })
    },

    async searchMainCurrency(req, res){
        await currency.findAll({
            where: {
                slug: ['dolar', 'euro', 'libra']
            }
        }).then(response => {
            res.json(response);
        }).catch(err => {
            console.log(err);
        })
    },

    async status(req, res){
        const process = {
            "status": true
        }
        res.json(process);
    },

    async invalidRoute(req, res){
        res.status(404).json({error: 'This is not a valid endpoint'});
    },

    async searchBySlug(req, res){

        const { slug } = req.params;

        await currency.findOne({
            where: {
                slug: slug
            }
        }).then(result => {

           console.log(result);
           if(result == null){
               res.status(404).json({error: `No registers found related to the slug ${slug}`});
           } else {
               res.status(200).json(result.dataValues);
           }
          
        }).catch(err => {
            console.log(err);
        })
    },

    async createCronUrl(req, res){
        const { slug, cron_url, currency } = req.body;

        cronUrls.create({
            currency: currency,
            slug: slug,
            cron_url: cron_url
        }).then(data => {
            res.status(200).json({result: 'A new cron url was successfully added to the list'});
        }).catch(err => {
            console.log(err);
        })
    },

    async deleteCurrency(req, res){
        const { slug } = req.body;

        if(slug != undefined && slug != null){
            currency.findAll({
                where: {
                    slug: slug
                }
            }).then(data => {
                
                if(data != undefined && data != null && data != [] && data.length >= 1){
                    currency.destroy({
                        where: {
                            slug: slug
                        }
                    }).then(() => {
                        cronUrls.destroy({
                            where: {
                                slug: slug
                            }
                        }).then(() => {
                            previousdayvalues.destroy({
                                where: {
                                    slug: slug
                                }
                            }).then(() => {
                                res.json({result: `Currency related to slug ${slug} successfully deleted`})
                            }).catch(err => {
                                console.log(err)
                            })
                        }).catch(err => {
                            console.log(err)
                        })
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    res.status(404).json({error: `Currency not found related to slug ${slug}`});
                }
            })
        } else {
            res.status(400).json({error: 'Please inform currency slug to delete'});
        }

       
    }

}