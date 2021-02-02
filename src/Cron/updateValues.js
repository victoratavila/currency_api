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
const urlPesoColombiano = 'https://www.melhorcambio.com/peso-colombiano-hoje';
const urlPesoChileno = 'https://www.melhorcambio.com/peso-chileno-hoje';
const urlDirham = 'https://www.melhorcambio.com/dirham-hoje';
const urlFracoSuico = 'https://www.melhorcambio.com/franco-suico-hoje';
const moment = require('moment');

// Run every minute when developing and midnight in production
if(process.env.PROD == undefined){
    var periodToRun = '* * * * *';
} else {
    var periodToRun = '0 * * * * ';
}

// Function to fetch the url html
const getData = async (url) => {
    const result = await axios.get(url);
    return result.data;
}


// Update dolar 
cron.schedule(periodToRun, async () => {
    const data = await getData(urlDolar);
        const $ = cheerio.load(data);
        var dollar = $('#comercial').val();
        var dollar = dollar.replace(",",".");

        await axios.put(`http://localhost:3000/currency/update`, { 
            currencyName: 'dollar',
            value: dollar,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Dolar - ' + 'R$ ' + dollar);
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

        await axios.put(`http://localhost:3000/currency/update`, { 
            currencyName: 'euro',
            value: euro,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Euro -' + 'R$ ' + euro);
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

        await axios.put(`http://localhost:3000/currency/update`, { 
            currencyName: 'pound',
            value: libra,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Pound - ' + 'R$ ' + libra);
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

        await axios.put('http://localhost:3000/currency/update', { 
            currencyName: 'canadian-dollar',
            value: dolarCanadense,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Canadian - ' + 'R$ ' + dolarCanadense);
        }).catch(err => {
            console.log(err);
        });
});

// Update Yen 
cron.schedule(periodToRun, async () => {
    const data = await getData(urlIene);
    const $ = cheerio.load(data);
    var iene = $('#comercial').val();
    var iene = iene.replace(",",".");

        await axios.put('http://localhost:3000/currency/update', { 
            currencyName: 'yen',
            value: iene,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Iene - ' + 'R$ ' + iene);
        }).catch(err => {
            console.log(err);
        });
});

// Update Australian dollar 
cron.schedule(periodToRun, async () => {
    const data = await getData(urlDolarAustraliano);
    const $ = cheerio.load(data);
    var dollarAustraliano = $('#comercial').val();
    var dollarAustraliano = dollarAustraliano.replace(",",".");

        await axios.put('http://localhost:3000/currency/update', { 
            currencyName: 'australian-dollar',
            value: dollarAustraliano,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Australian dollar - ' + 'R$ ' + dollarAustraliano);
        }).catch(err => {
            console.log(err);
        });
});

// Update Mexican peso 
cron.schedule(periodToRun, async () => {
    const data = await getData(urlPesoMexicano);
    const $ = cheerio.load(data);
    var pesoMexicano = $('#comercial').val();
    var pesoMexicano = pesoMexicano.replace(",",".");

        await axios.put('http://localhost:3000/currency/update', { 
            currencyName: 'mexican-peso',
            value: pesoMexicano,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Mexican peso - ' + 'R$ ' + pesoMexicano);
        }).catch(err => {
            console.log(err);
        });
});

// Update Argentine peso 
cron.schedule(periodToRun, async () => {
    const data = await getData(urlPesoArgentino);
    const $ = cheerio.load(data);
    var pesoArgentino = $('#comercial').val();
    var pesoArgentino = pesoArgentino.replace(",",".");

        await axios.put('http://localhost:3000/currency/update', { 
            currencyName: 'argentine-peso',
            value: pesoArgentino,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Argentine peso - ' + 'R$ ' + pesoArgentino);
        }).catch(err => {
            console.log(err);
        });
});

// Update Colombian peso 
cron.schedule(periodToRun, async () => {
    const data = await getData(urlPesoColombiano);
    const $ = cheerio.load(data);
    var pesoColombiano = $('#comercial').val();
    var pesoColombiano = pesoColombiano.replace(",",".");

        await axios.put('http://localhost:3000/currency/update', { 
            currencyName: 'colombian-peso',
            value: pesoColombiano,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Colombian peso - ' + 'R$ ' + pesoColombiano);
        }).catch(err => {
            console.log(err);
        });
});

// Update Colombian peso 
cron.schedule(periodToRun, async () => {
    const data = await getData(urlPesoChileno);
    const $ = cheerio.load(data);
    var pesoChileno = $('#comercial').val();
    var pesoChileno = pesoChileno.replace(",",".");

        await axios.put('http://localhost:3000/currency/update', { 
            currencyName: 'chilean-peso',
            value: pesoChileno,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Chilean peso - ' + 'R$ ' + pesoChileno);
        }).catch(err => {
            console.log(err);
        });
});

// Update Dirham
cron.schedule(periodToRun, async () => {
    const data = await getData(urlDirham);
    const $ = cheerio.load(data);
    var dirham = $('#comercial').val();
    var dirham = dirham.replace(",",".");

        await axios.put('http://localhost:3000/currency/update', { 
            currencyName: 'dirham',
            value: dirham,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Dirham - ' + 'R$ ' + dirham);
        }).catch(err => {
            console.log(err);
        });
});

// Update Swiss Franc
cron.schedule(periodToRun, async () => {
    const data = await getData(urlFracoSuico);
    const $ = cheerio.load(data);
    var francoSuico = $('#comercial').val();
    var francoSuico = francoSuico.replace(",",".");

        await axios.put('http://localhost:3000/currency/update', { 
            currencyName: 'swiss-franc',
            value: francoSuico,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Franco suíço - ' + 'R$ ' + francoSuico);
        }).catch(err => {
            console.log(err);
        });
});


module.exports = cron;