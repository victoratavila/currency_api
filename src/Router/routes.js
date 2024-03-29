const express = require('express');
const router = express.Router();
const Currency = require('../Controllers/Currency');
const Suggestion = require('../Controllers/Suggestion');
const Calculator = require('../Controllers/Calculator');
const User = require('../Controllers/User');  
const Login = require('../Controllers/Login');
const Auth = require('../Middleware/auth');
const Reports = require('../Controllers/Reports');
const Sheet = require('../Controllers/Sheet/Sheet');
const Countries = require('../Controllers/Countries');
const CronUpdateValues =  require('../Cron/updateValues');
const CronStorePreviousDayValues =  require('../Cron/storePreviousDayCurrencyValues.js');
const CronCurrencyHistory = require('../Cron/currencyHistory.js');
const CurrencyHistory = require('../Controllers/CurrencyHistory');
const chatGPT = require('../Controllers/ChatGPT/index')
const cors = require('cors');

// const whitelist = ['http://localhost:3000', 'http://conversordemoeda.xyz', 'https://conversordemoeda.xyz']

// const corsOptions = {
//     origin: 'https://conversordemoeda.xyz',
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false,
//     optionsSuccessStatus: 200
//   }

// const authenticate = (req, res, next) => {

//     const origin = req.get('origin');
//     console.log(origin);
//     if(origin === 'http://localhost:3000' || origin === 'https://conversordemoeda.xyz' || origin === undefined){
//         next();
//     } else {
//         res.status(403).json({error: 'Access denied'});
//     }
    
  
// }
   

router.get('/currency/include/:currencyName', Currency.getCurrencyIncluding);
router.get('/currency/all', Currency.getAll);
router.post('/currency/create/history', CurrencyHistory.registerHistory);
router.get('/currency/yesterday/all',Currency.getAllFromYesterday);
router.get('/currency/filter/:order', Currency.getAllByOrder);
router.get('/currency/:currencyName', Currency.getCurrency);
router.post('/currency/new', Auth, Currency.createCurrency);
router.put('/currency/update', Currency.updateCurrency);
router.put('/currency/store/previousday', Currency.updatePreviousDayCurrency);
router.get('/currency/code/:code', Currency.searchByCode);
router.get('/currency/slug/:slug', Currency.searchBySlug);
router.get('/status', Currency.status);
router.post('/suggestion', Suggestion.sendSuggestion);
router.get('/suggestion', Auth, Suggestion.getSuggestions)
router.get('/suggestion/pending/page/:num', Suggestion.getSuggestionPage);
router.get('/newsletter/all', Auth, Suggestion.listNewsletterUsers);
router.post('/newsletter/send', Auth, Suggestion.sendNewsletter);
router.post('/newsletter/sign', Suggestion.signNewsletter);
router.delete('/newsletter/cancel/:email', Suggestion.cancelNewsletterSubscription);
router.get('/reports', Reports.compareValues);
router.get('/reports/generate', Sheet.generateSheet);
router.get('/reports/generate/include/:currencyName', Sheet.generateSheetIncluiding);
router.get('/reports/generate/yesterday-and-today/:code', Sheet.generateYesterdaySheet);
router.get('/today/yesterday/:code', Currency.getTodayAndYesterdayValues);
router.post('/create/cron-url', Currency.createCronUrl);
router.post('/calculator', Calculator.Calculator);
router.post('/calculator/real', Calculator.realCalculator);
router.delete('/currency/delete', Auth, Currency.deleteCurrency);

router.get('/chat-gpt', chatGPT.checkData)
// Countries Routes
router.get('/country/all', Countries.getAll);
router.get('/country/search/:currency_code', Countries.searchCountryByCurrency);
router.post('/country/create', Countries.createCountry);

// Currency History
router.get('/currency/history/:currencyName/:period', CurrencyHistory.getHistoryByCurrency);

//Login Routes
router.post('/login', Login.login);

router.post('/create-user', User.createUser);

router.put('/currency/suggestion/:id', Suggestion.approveOrReject);

router.get('/validate-token', Login.validateToken);

// Return 404 error if route does not exist
router.get('*', Currency.invalidRoute);


module.exports = router;
