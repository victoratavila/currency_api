const cron = require('node-cron');
const axios = require('axios');

if(process.env.PROD == true){
    cron.schedule('* * * * *', () => {
        const url = 'https://currencycoverter-api.herokuapp.com/status'
        console.log('running a task every minute');

        axios.get(url).then((result) => {
            console.log(`Server refreshed = ${result.data.status}`)
        }).catch(err => {
            console.log(err);
        });

    });
}


module.exports = cron;