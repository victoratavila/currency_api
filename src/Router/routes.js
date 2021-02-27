const express = require('express');
const router = express.Router();
const Currency = require('../Controllers/Currency');
const Spreadsheet = require('../Controllers/Spreadsheet');
const Mail = require('../Controllers/Mail');
const cron = require('../Cron/updateValues');

router.get('/currency/main', Currency.searchMainCurrency);
router.get('/currency/all', Currency.getAll);
router.get('/currency/:currencyName', Currency.getCurrency);
router.post('/currency/new', Currency.createCurrency);
router.put('/currency/update', Currency.updateCurrency);
router.get('/currency/code/:code', Currency.searchByCode);
router.get('/status', Currency.status);
router.get('/suggestion', Mail.sendSuggestion);
module.exports = router;
