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
const urlRenminbi = 'https://www.melhorcambio.com/iuan-hoje';
const moment = require('moment');

// Cron job responsible for storing the currency values of the day at 23:59

// Run every minute when developing and every 1h in production
if(process.env.PROD == undefined){
    var periodToRun = '55 23 * * *';
    var URL = 'http://localhost:8080/currency/store/previousday';
} else {
    var periodToRun = '55 23 * * *';
    var URL = `https://currencycoverter-api.herokuapp.com/currency/store/previousday`;
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

        await axios.put(URL, { 
            slug: 'dolar',
            value: dollar,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Dólar - ' + 'R$ ' + dollar);
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

        await axios.put(URL, { 
            slug: 'euro',
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

        await axios.put(URL, { 
            slug: 'libra',
            value: libra,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Libra - ' + 'R$ ' + libra);
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

        await axios.put(URL, { 
            slug: 'dolar-canadense',
            value: dolarCanadense,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Dólar Canadense - ' + 'R$ ' + dolarCanadense);
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

        await axios.put(URL, { 
            slug: 'iene',
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

        await axios.put(URL, { 
            slug: 'dolar-australiano',
            value: dollarAustraliano,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Dólar Australiano  - ' + 'R$ ' + dollarAustraliano);
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

        await axios.put(URL, { 
            slug: 'peso-mexicano',
            value: pesoMexicano,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Peso Mexicano - ' + 'R$ ' + pesoMexicano);
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

        await axios.put(URL, { 
            slug: 'peso-argentino',
            value: pesoArgentino,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Peso Argentino - ' + 'R$ ' + pesoArgentino);
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

        await axios.put(URL, { 
            slug: 'peso-colombiano',
            value: pesoColombiano,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Peso Colombiano - ' + 'R$ ' + pesoColombiano);
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

        await axios.put(URL, { 
            slug: 'peso-chileno',
            value: pesoChileno,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Peso Chileno - ' + 'R$ ' + pesoChileno);
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

        await axios.put(URL, { 
            slug: 'dirham',
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

        await axios.put(URL, { 
            slug: 'franco-suico',
            value: francoSuico,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Franco suíço - ' + 'R$ ' + francoSuico);
        }).catch(err => {
            console.log(err);
        });
});

// Update Swiss Franc
cron.schedule(periodToRun, async () => {
    const data = await getData(urlRenminbi);
    const $ = cheerio.load(data);
    var renminbi = $('#comercial').val();
    var renminbi = renminbi.replace(",",".");

        await axios.put(URL, { 
            slug: 'yuan',
            value: renminbi,
            lastUpdate: moment().locale('pt-br').format('L')
        }).then(() => {
            console.log('Yuan - ' + 'R$ ' + renminbi);
        }).catch(err => {
            console.log(err);
        });
});



module.exports = cron;