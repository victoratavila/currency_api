const express = require('express');
const currency = require('../Models/currency');
const previousdayvalues = require('../Models/previousdayvalues');
const percentage = require('calculate-percentages');

module.exports = {
    async compareValues(req, res){

        let process = {}
        let results = {};

        await currency.findAll({
            attributes: ['currency', 'value', 'lastUpdate', 'slug'],
            raw: true
         }).then(currencies => {

           previousdayvalues.findAll({
            attributes: ['currency', 'value', 'lastUpdate', 'slug'],
            raw: true
           }).then(yerterdayCurrencies => {

            // for(let i = 0; i < currencies.length; i++){
      
            //   let yesterdayValue = currencies[i].dataValues.value;
            //   let todayValue = yerterdayCurrencies[i].dataValues.value;

            //   let currencyName = currencies[i].dataValues.slug;

            //   if(todayValue > yesterdayValue){
            //       let difference = (percentage.differenceBetween(todayValue, yesterdayValue)).toFixed(0);

            //       results[currencyName] = `${difference}%`;

            //   } else {
            //     let difference = (percentage.differenceBetween(todayValue, yesterdayValue)).toFixed(0);

            //     results[currencyName] = `${difference}%`;
            //   }
            // }

            async function searchYesterday(){

              await yerterdayCurrencies.forEach(yesterday => {
                let yesterdayValue = yesterday.value;
                let slug = yesterday.slug;

                if(process[slug] != undefined){
               
                   let todayValue = process[slug];
 
                   const difference = percentage.differenceBetween(yesterdayValue, todayValue).toFixed(2);
         
                  results[slug] = difference;

                }
               

              })

            }

          
            currencies.forEach(( today => {

              let todayValue = today.value;
              let slug = today.slug;

              // Storing temporarely the value in the object results
               process[slug] = todayValue;
               searchYesterday();
          }))



    
            res.json(results)
           }).catch(err => {
               console.log(err);
           })


         }).catch(err => {
             console.log(err);
         });
    }
}
