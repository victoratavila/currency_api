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

// Function to fetch the url html

const getData = async (url) => {
    const result = await axios.get(url);
    return result.data;
}

// const baseURL = 'http://localhost:8080/currency';
const baseURL = 'http://globalcurrencyapi-com.umbler.net/currency';


describe('API Currency values', () => {

    it('Dolar value must be equal to the current value', async () => {

        await axios.get(baseURL + '/dollar').then( async dolar => {
            let dolar_response = dolar.data[0].value;
            const data = await getData(urlDolar);
            const $ = cheerio.load(data);
            var dollar = $('#comercial').val();
            var dollar = dollar.replace(",",".");
            var dollar = parseFloat(dollar);
            
            expect(dollar).toEqual(dolar_response);
        }).catch(err => {
            console.log(err);
        })
    });

    it('Euro value must be equal to the current value', async () => {

        await axios.get(baseURL + '/euro').then( async euro => {
            let euro_response = euro.data[0].value;
            const data = await getData(urlEuro);
            const $ = cheerio.load(data);
            var euroValue = $('#comercial').val();
            var euroValue = euroValue.replace(",",".");
            var euroValue = parseFloat(euroValue);

            expect(euroValue).toEqual(euro_response);
        }).catch(err => {
            console.log(err);
        })
    });

    
    it('Pound value must be equal to the current value', async () => {

        await axios.get(baseURL + '/pound').then( async pound => {
            let pound_response = pound.data[0].value;
            const data = await getData(urlLibra);
            const $ = cheerio.load(data);
            var poundValue = $('#comercial').val();
            var poundValue = poundValue.replace(",",".");
            var poundValue = parseFloat(poundValue);

            expect(poundValue).toEqual(pound_response);
        }).catch(err => {
            console.log(err);
        })
    });

    it('Canadian dollar value must be equal to the current value', async () => {

        await axios.get(baseURL + '/canadian-dollar').then( async canadian => {
            let canadian_dolar_response = canadian.data[0].value;
            const data = await getData(urlDolarCanadense);
            const $ = cheerio.load(data);
            var canadianDolar = $('#comercial').val();
            var canadianDolar = canadianDolar.replace(",",".");
            var canadianDolar = parseFloat(canadianDolar);

            expect(canadianDolar).toEqual(canadian_dolar_response);
        }).catch(err => {
            console.log(err);
        })
    });

    it('Iene value must be equal to the current value', async () => {

        await axios.get(baseURL + '/yen').then( async yen => {
            let iene_response = yen.data[0].value;
            const data = await getData(urlIene);
            const $ = cheerio.load(data);
            var iene = $('#comercial').val();
            var iene = iene.replace(",",".");
            var iene = parseFloat(iene);

            expect(iene).toEqual(iene_response);
        }).catch(err => {
            console.log(err);
        })
    });

    it('Australian dollar must be equal to the current value', async () => {

        await axios.get(baseURL + '/australian-dollar').then( async yen => {
            let australian_dolar_response = yen.data[0].value;
            const data = await getData(urlDolarAustraliano);
            const $ = cheerio.load(data);
            var australianDollar = $('#comercial').val();
            var australianDollar = australianDollar.replace(",",".");
            var australianDollar = parseFloat(australianDollar);

            expect(australianDollar).toEqual(australian_dolar_response);
        }).catch(err => {
            console.log(err);
        })
    });

    it('Mexican peso must be equal to the current value', async () => {

        await axios.get(baseURL + '/mexican-peso').then( async mexican => {
            let mexican_peso_response = mexican.data[0].value;
            const data = await getData(urlPesoMexicano);
            const $ = cheerio.load(data);
            var mexicanPeso = $('#comercial').val();
            var mexicanPeso = mexicanPeso.replace(",",".");
            var mexicanPeso = parseFloat(mexicanPeso);

            expect(mexicanPeso).toEqual(mexican_peso_response);
        }).catch(err => {
            console.log(err);
        })
    });

    
    it('Argentine peso must be equal to the current value', async () => {

        await axios.get(baseURL + '/argentine-peso').then( async argentine => {
            let argentine_peso_response = argentine.data[0].value;
            const data = await getData(urlPesoArgentino);
            const $ = cheerio.load(data);
            var argentinePeso = $('#comercial').val();
            var argentinePeso = argentinePeso.replace(",",".");
            var argentinePeso = parseFloat(argentinePeso);

            expect(argentinePeso).toEqual(argentine_peso_response);
        }).catch(err => {
            console.log(err);
        })
    });

    it('Colombian peso must be equal to the current value', async () => {

        await axios.get(baseURL + '/colombian-peso').then( async colombian => {
            let colombian_peso_response = colombian.data[0].value;
            const data = await getData(urlPesoColombiano);
            const $ = cheerio.load(data);
            var colombianPeso = $('#comercial').val();
            var colombianPeso = colombianPeso.replace(",",".");
            var colombianPeso = parseFloat(colombianPeso);

            expect(colombianPeso).toEqual(colombian_peso_response);
        }).catch(err => {
            console.log(err);
        })
    });

    it('Chilean peso must be equal to the current value', async () => {

        await axios.get(baseURL + '/chilean-peso').then( async chilean => {
            let chilean_peso_response = chilean.data[0].value;
            const data = await getData(urlPesoChileno);
            const $ = cheerio.load(data);
            var chileanPeso = $('#comercial').val();
            var chileanPeso = chileanPeso.replace(",",".");
            var chileanPeso = parseFloat(chileanPeso);

            expect(chileanPeso).toEqual(chilean_peso_response);
        }).catch(err => {
            console.log(err);
        })
    });

    it('Dirham peso must be equal to the current value', async () => {

        await axios.get(baseURL + '/dirham').then( async dirham => {
            let dirham_response = dirham.data[0].value;
            const data = await getData(urlDirham);
            const $ = cheerio.load(data);
            var dirhamValue = $('#comercial').val();
            var dirhamValue = dirhamValue.replace(",",".");
            var dirhamValue = parseFloat(dirhamValue);

            expect(dirhamValue).toEqual(dirham_response);
        }).catch(err => {
            console.log(err);
        })
    });

    it('Swiss franc must be equal to the current value', async () => {

        await axios.get(baseURL + '/swiss-franc').then( async swissFranc => {
            let swiss_franc_response = swissFranc.data[0].value;
            const data = await getData(urlFracoSuico);
            const $ = cheerio.load(data);
            var swissFrancValue = $('#comercial').val();
            var swissFrancValue = swissFrancValue.replace(",",".");
            var swissFrancValue = parseFloat(swissFrancValue);

            expect(swiss_franc_response).toEqual(swissFrancValue);
        }).catch(err => {
            console.log(err);
        })
    });

        it('Renminbi must be equal to the current value', async () => {

        await axios.get(baseURL + '/renminbi').then( async renminbi => {
            let renminbi_response = renminbi.data[0].value;
            const data = await getData(urlRenminbi);
            const $ = cheerio.load(data);
            var renminbiValue = $('#comercial').val();
            var renminbiValue = renminbiValue.replace(",",".");
            var renminbiValue = parseFloat(renminbiValue);

            expect(renminbiValue).toEqual(renminbi_response);
        }).catch(err => {
            console.log(err);
        })
    });


})