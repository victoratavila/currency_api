var cron = require('node-cron');
const axios = require('axios');
const cheerio = require('cheerio');

const moment = require('moment');
const cronUrls = require('../Models/cron_urls');

// Run every minute when developing and every 23:50 in production
if(process.env.PROD == undefined){
    var periodToRun = '* * * * *';
    var URL = 'http://localhost:8080/currency/store/previousday';
} else {
    var periodToRun = '50 23 * * *';
    var URL = `https://currencycoverter-api.herokuapp.com/currency/store/previousday`;
}

// Function to fetch the url html
const getData = async (url) => {
    const result = await axios.get(url);
    return result.data;
}

    // Update currencies 
    cron.schedule(periodToRun, async () => {

        cronUrls.findAll({
            raw: true
        }).then(data => {
            data.map(async currency => {
        
                const data = await getData(currency.cron_url);
                const $ = cheerio.load(data);
                var currentCurrencyValue = $('#comercial').val();
                var currentCurrencyValue = currentCurrencyValue.replace(",",".");

                // console.log(currency)
    
                // await axios.put(URL, { 
                //     slug: currency.slug,
                //     value: currentCurrencyValue,
                //     lastUpdate: moment().locale('pt-br').format('L')
                // }).then(() => {
                //     console.log( `${currency.slug } = R$ ${currentCurrencyValue}` );
                // }).catch(err => {
                //     console.log(err);
                // });
            })
        
        });

});