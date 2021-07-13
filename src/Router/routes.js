const express = require('express');
const router = express.Router();
const Currency = require('../Controllers/Currency');
const Suggestion = require('../Controllers/Suggestion');
const cron = require('../Cron/updateValues');
const Calculator = require('../Controllers/Calculator');
const User = require('../Controllers/User');  
const Login = require('../Controllers/Login');

router.get('/currency/main', Currency.searchMainCurrency);
router.get('/currency/all', Currency.getAll);
router.get('/currency/:currencyName', Currency.getCurrency);
router.post('/currency/new', Currency.createCurrency);
router.put('/currency/update', Currency.updateCurrency);
router.get('/currency/code/:code', Currency.searchByCode);
router.get('/currency/slug/:slug', Currency.searchBySlug);
router.get('/status', Currency.status);
router.post('/suggestion', Suggestion.sendSuggestion);
router.get('/suggestion', Suggestion.getSuggestions)
router.get('/suggestion/page/:num', Suggestion.getSuggestionPage);
router.post('/newsletter', Suggestion.sendNewsletter);

router.post('/calculator', Calculator.Calculator);

//Login Routes
router.post('/login', Login.login);

router.post('/create-user', User.createUser);

// Return 404 error if route does not exist
router.get('*', Currency.invalidRoute);

module.exports = router;
