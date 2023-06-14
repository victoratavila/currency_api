var cron = require('node-cron');
const axios = require('axios');
const cheerio = require('cheerio');

const moment = require('moment');
const cronUrls = require('../Models/cron_urls');
const CurrenciesHistory = require('../Models/currencies_history');
const { raw } = require('express');
const Currency = require('../Models/currency');

// Run every minute when developing and every 23:50 in production
if(process.env.PROD == undefined){
    var periodToRun = '* * * * *';
    var URL = 'http://localhost:8080/currency/create/history';
} else {
    var periodToRun = '50 23 * * *';
    var URL = `https://currencycoverter-api.herokuapp.com/currency/create/history`;
}

// Function to fetch the url html
const getData = async (url) => {
    const result = await axios.get(url);
    return result.data;
}

    // Update currencies 
    cron.schedule(periodToRun, async () => {       

        // // Getting cron urls in database

        cronUrls.findAll({
            raw: true
        }).then( async crons_data => {

            // Get the slug for the currencies stored in the cron
            crons_data.map( async cron_urls_values => {

                const cron_slugs = cron_urls_values.slug;
                const cron_urls = cron_urls_values.cron_url;
                const cron_currency_name = cron_urls_values.currency;

                CurrenciesHistory.findAll({
                    where: { slug: cron_slugs },
                    raw: true 

                }).then( async currency_history_values => {
                 
                    // Amount of registers for the check currency, it must always respect the limit of the const below
                    const registers_amount = currency_history_values.length;

                    //Limit amount of stores for each currency
                    const storeCurrencyLimit = 30;

                    if(registers_amount <= storeCurrencyLimit-1){

                        // The currency has less registers than the limit, so add one more

                        const data = await getData(cron_urls);
                        const $ = cheerio.load(data);
                        var currentCurrencyValue = $('#comercial').val();
                        var currentCurrencyValue = currentCurrencyValue.replace(",",".");

                        console.log(crons_data)

                    } else {


                        // In case the limit will be reached, remove the older one to add the new one
                    }

                }).catch(err => {
                    console.log(err)
                })

            })

        } ).catch(err => {
            console.log(err);
        })

        // // Getting cron data in database
        // cronUrls.findAll({
        //     raw: true
        // }).then(data => {
        //     data.map(async currency => {

        //        CurrenciesHistory.findAll({
        //         where: {
        //             slug: currency.slug
        //         },

        //         raw: true

        //        }).then(async result => {

        //         if(result.length > 0){

        //             // How many registers are already stored for the currency checked 
        //             const registersAmount = result.length;

        //             //Limit amount of stores for each currency
        //             const storeCurrencyLimit = 30;

        //             // Create the history if is not reaching the maximum of histories for the currency
        //             if(result.length <= storeCurrencyLimit-1){

        //                 const data = await getData(currency.cron_url);
        //                 const $ = cheerio.load(data);
        //                 var currentCurrencyValue = $('#comercial').val();
        //                 var currentCurrencyValue = currentCurrencyValue.replace(",",".");
        
        //                 console.log(currency)

        //                 console.log(currentCurrencyValue)
            
        //                 await axios.post(URL, { 
        //                     currency: currency.currency,
        //                     slug: currency.slug,
        //                     value: currentCurrencyValue,
        //                     code: result[0].code,
        //                     symbol: result[0].symbol,
        //                     date: moment().locale('pt-br').format('L')
        //                 }).then(() => {
        //                     console.log( `${currency.slug } = R$ ${currentCurrencyValue}` );
        //                 }).catch(err => {
        //                     console.log(err);
        //                 });

        //                 // }).then(() => {
        //                 //     console.log('+ 1 ' +  result[0].currency);
        //                 // }).catch(err => {
        //                 //     console.log(err);
        //                 // })

        //             } else {

        //                 // If the currency history reached the limit
        //                 CurrenciesHistory.findAll({
        //                     where: {
        //                         currency: currency.currency
        //                     },
                            
        //                     raw: true
        //                 }).then( async (result) => {

        //                     // Creating array with the ids for each currency
        //                     let currency_ids_order = [];
                            
        //                     result.map(test => {

        //                         currency_ids_order.push(test.id)
                            
        //                     })

        //                     // Getting the first register for the currency
        //                     const min = Math.min(...currency_ids_order)

        //                     console.log(min)

        //                     // Deleting the first register for the currency
        //                     await CurrenciesHistory.destroy({
        //                         where: {
        //                             id: min
        //                         }
        //                     }).then( async () => {
        //                         console.log(`Menor valor de ${currency.currency} (${min} removido)`)
        //                     }).catch(err => {
        //                         console.log(err)
        //                     })

        //                     // Registering a new history

        //                     await axios.post(URL, {
        //                         currency: result[0].currency,
        //                         slug: result[0].slug,
        //                         value: result[0].value,
        //                         code: result[0].code,
        //                         symbol: result[0].symbol,
        //                         date: moment().locale('pt-br').format('L')
    
        //                     }).then(() => {
        //                         console.log('+ 1 ' +  result[0].currency);
        //                     }).catch(err => {
        //                         console.log(err);
        //                     })
                  
        //                 })
        //             }
    
                    
    
        //         }
                
       
            

        //         if(registersAmount < 10) {
        //             CurrenciesHistory.create({
        //                 currency: currency.currency,
        //                 slug: currency.slug,
        //                 value: 3.22,
        //                 code: 'USD',
        //                 symbol: '$',
        //                 date: '29/04/2022'
        //             })
        //         }
                

              
        //        }).catch(err => {
        //         console.log(err);
        //        })
               
           
        //     })
        
        // });

});