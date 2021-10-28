const express = require('express');
const router = express.Router();
const Currency = require('../Controllers/Currency');
const Suggestion = require('../Controllers/Suggestion');
const Calculator = require('../Controllers/Calculator');
const User = require('../Controllers/User');  
const Login = require('../Controllers/Login');
const Auth = require('../Middleware/auth');
const Reports = require('../Controllers/Reports');
const CronUpdateValues =  require('../Cron/updateValues');
const CronStorePreviousDayValues =  require('../Cron/storePreviousDayCurrencyValues.js');
const cors = require('cors');

// const whitelist = ['http://localhost:3000', 'http://conversordemoeda.xyz', 'https://conversordemoeda.xyz']

// const corsOptions = {
//     origin: 'https://conversordemoeda.xyz',
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false,
//     optionsSuccessStatus: 200
//   }

const authenticate = (req, res, next) => {
    console.log(req.get('host'));
    next();
}
   

router.get('/currency/include/:currencyName', Currency.getCurrencyIncluding);
router.get('/currency/all', authenticate, Currency.getAll);
router.get('/currency/yesterday/all',Currency.getAllFromYesterday);
router.get('/currency/all/:order', Currency.getAllByOrder);
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
router.post('/newsletter', Auth, Suggestion.sendNewsletter);
router.get('/reports', Reports.compareValues);
router.get('/today/yesterday/:code', Currency.getTodayAndYesterdayValues);

router.post('/calculator', Calculator.Calculator);

//Login Routes
router.post('/login', Login.login);

router.post('/create-user', User.createUser);

router.put('/currency/suggestion/:id', Suggestion.approveOrReject);

router.get('/validate-token', Login.validateToken);

// Return 404 error if route does not exist
router.get('*', Currency.invalidRoute);


module.exports = router;
