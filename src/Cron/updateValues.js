var cron = require('node-cron');
const axios = require('axios');
const cheerio = require('cheerio');
const urlDolar = 'https://www.melhorcambio.com/dolar-hoje';
const urlEuro = 'https://www.melhorcambio.com/euro-hoje';
const urlLibra = 'https://www.melhorcambio.com/libra-hoje';
const urlDolarCanadense = 'https://www.melhorcambio.com/dolar-canadense-hoje';
const urlIene = 'https://www.melhorcambio.com/iene-hoje';
const urlDolarAustraliano = 'https://www.melhorcambio.com/dolar-australiano-hoje';
const urlPesoMexicano = 'https://www.melhorcambio.com/peso-mexicano-hoje';
const urlPesoArgentino = 'https://www.melhorcambio.com/peso-argentino-hoje';
const moment = require('moment');

// Run every midnight
const periodToRun = '0 0 * * *';

const getData = async (url) => {
    const result = await axios.get(url);
    return result.data;
}

// aaa

// Update dolar 
cron.schedule(periodToRun, async () => {
    const data = await getData(urlDolar);
        const $ = cheerio.load(data);
        var dollar = $('#comercial').val();
        var dollar = dollar.replace(",",".");

        await axios.put(`http://localhost:8080/update`, { 
            currencyName: 'dollar',
            value: dollar,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Dolar value successfully updated to ' + 'R$ ' + dollar);
        }).catch(err => {
            console.log(err);
        });
});

// Update euro 
cron.schedule(periodToRun, async () => {
    const data = await getData(urlEuro);
    const $ = cheerio.load(data);
    var euro = $('#comercial').val();
    var euro = euro.replace(",",".");

        await axios.put(`http://localhost:8080/update`, { 
            currencyName: 'euro',
            value: euro,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Euro value successfully updated to ' + 'R$ ' + euro);
        }).catch(err => {
            console.log(err);
        });
});

// Update pound 
cron.schedule(periodToRun, async () => {
    const data = await getData(urlLibra);
    const $ = cheerio.load(data);
    var libra = $('#comercial').val();
    var libra = libra.replace(",",".");

        await axios.put(`http://localhost:8080/update`, { 
            currencyName: 'pound',
            value: libra,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Pound value successfully updated to ' + 'R$ ' + libra);
        }).catch(err => {
            console.log(err);
        });
});


// Update canadian dolar 
cron.schedule(periodToRun, async () => {
    const data = await getData(urlDolarCanadense);
    const $ = cheerio.load(data);
    var dolarCanadense = $('#comercial').val();
    var dolarCanadense = dolarCanadense.replace(",",".");

        await axios.put('http://localhost:8080/update', { 
            currencyName: 'canadian-dollar',
            value: dolarCanadense,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Canadian dollar value successfully updated to ' + 'R$ ' + dolarCanadense);
        }).catch(err => {
            console.log(err);
        });
});

// Update Iene 
cron.schedule(periodToRun, async () => {
    const data = await getData(urlIene);
    const $ = cheerio.load(data);
    var iene = $('#comercial').val();
    var iene = iene.replace(",",".");

        await axios.put('http://localhost:8080/update', { 
            currencyName: 'yen',
            value: iene,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Iene value successfully updated to ' + 'R$ ' + iene);
        }).catch(err => {
            console.log(err);
        });
});

// Update Iene 
cron.schedule(periodToRun, async () => {
    const data = await getData(urlDolarAustraliano);
    const $ = cheerio.load(data);
    var dollarAustraliano = $('#comercial').val();
    var dollarAustraliano = dollarAustraliano.replace(",",".");

        await axios.put('http://localhost:8080/update', { 
            currencyName: 'australian-dollar',
            value: dollarAustraliano,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Australian dollar value successfully updated to ' + 'R$ ' + dollarAustraliano);
        }).catch(err => {
            console.log(err);
        });
});

// Update Iene 
cron.schedule(periodToRun, async () => {
    const data = await getData(urlPesoMexicano);
    const $ = cheerio.load(data);
    var pesoMexicano = $('#comercial').val();
    var pesoMexicano = pesoMexicano.replace(",",".");

        await axios.put('http://localhost:8080/update', { 
            currencyName: 'mexican-peso',
            value: pesoMexicano,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Mexican peso value successfully updated to ' + 'R$ ' + pesoMexicano);
        }).catch(err => {
            console.log(err);
        });
});

// Update Iene 
cron.schedule(periodToRun, async () => {
    const data = await getData(urlPesoArgentino);
    const $ = cheerio.load(data);
    var pesoArgentino = $('#comercial').val();
    var pesoArgentino = pesoArgentino.replace(",",".");

        await axios.put('http://localhost:8080/update', { 
            currencyName: 'argentine-peso',
            value: pesoArgentino,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Argentine peso value successfully updated to ' + 'R$ ' + pesoArgentino);
        }).catch(err => {
            console.log(err);
        });
});


module.exports = cron;