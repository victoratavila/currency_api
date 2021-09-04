const express = require('express');
const router = express.Router();
const Currency = require('../Controllers/Currency');
const Suggestion = require('../Controllers/Suggestion');
const Calculator = require('../Controllers/Calculator');
const User = require('../Controllers/User');  
const Login = require('../Controllers/Login');
const Auth = require('../Middleware/auth');
const Cron =  require('../Cron/updateValues');

router.get('/currency/include/:currencyName', Currency.getCurrencyIncluding);
router.get('/currency/all', Currency.getAll);
router.get('/currency/all/:order', Currency.getAllByOrder);
router.get('/currency/:currencyName', Currency.getCurrency);
router.post('/currency/new', Auth, Currency.createCurrency);
router.put('/currency/update', Currency.updateCurrency);
router.get('/currency/code/:code', Currency.searchByCode);
router.get('/currency/slug/:slug', Currency.searchBySlug);
router.get('/status', Currency.status);
router.post('/suggestion', Suggestion.sendSuggestion);
router.get('/suggestion', Auth, Suggestion.getSuggestions)
router.get('/suggestion/pending/page/:num', Suggestion.getSuggestionPage);
router.post('/newsletter', Auth, Suggestion.sendNewsletter);

router.post('/calculator', Calculator.Calculator);

//Login Routes
router.post('/login', Login.login);

router.post('/create-user', User.createUser);

router.put('/currency/suggestion/:id', Suggestion.approveOrReject);

router.get('/validate-token', Login.validateToken);

// Return 404 error if route does not exist
router.get('*', Currency.invalidRoute);


module.exports = router;
