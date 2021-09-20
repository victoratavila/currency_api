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


            async function searchYesterday(){

              await yerterdayCurrencies.forEach(yesterday => {
                let yesterdayValue = yesterday.value;
                let slug = yesterday.slug;

                // Checking if the slug exists in the original object
                if(process[slug] != undefined){
               
                   let todayValue = process[slug];
 
                   // Calculating the difference between yesterday value and today value
                   const difference = percentage.differenceBetween(yesterdayValue, todayValue).toFixed(2);
                   console.log(difference.charAt(0))

                   if(difference.charAt(0) != '-'){
                    results[slug] = `+${difference}%`;
                   } else {
                    results[slug] = `${difference}%`;
                   }
               
                  

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
