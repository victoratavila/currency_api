const express = require('express');
const router = express.Router();
const Currency = require('../Controllers/Currency');
const Spreadsheet = require('../Controllers/Spreadsheet');
const Suggestion = require('../Controllers/Suggestion');
const cron = require('../Cron/updateValues');
const Calculator = require('../Controllers/Calculator');

router.get('/currency/main', Currency.searchMainCurrency);
router.get('/currency/all', Currency.getAll);
router.get('/currency/:currencyName', Currency.getCurrency);
router.post('/currency/new', Currency.createCurrency);
router.put('/currency/update', Currency.updateCurrency);
router.get('/currency/code/:code', Currency.searchByCode);
router.get('/status', Currency.status);
router.post('/suggestion', Suggestion.sendSuggestion);
router.get('/suggestion', Suggestion.getSuggestions)
router.post('/newsletter', Suggestion.sendNewsletter);

router.post('/calculator', Calculator.Calculator);

// Return 404 error if route does not exist
router.get('*', Currency.invalidRoute);

module.exports = router;
