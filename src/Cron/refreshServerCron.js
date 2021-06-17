const cron = require('node-cron');
const axios = require('axios');
const PORT = process.env.PORT;

if(process.env.PROD == true){
    cron.schedule('*/10 * * * *', () => {
        const url = `http://localhost:${PORT}/status`;
        console.log('running a task every minute');

        axios.get(url).then((result) => {
            console.log(`Server refreshed = ${result.data.status}`)
        }).catch(err => {
            console.log(err);
        });

    });
}


module.exports = cron;