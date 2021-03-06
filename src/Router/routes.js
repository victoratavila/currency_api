const express = require('express');
const router = express.Router();
const Currency = require('../Controllers/Currency');
const cron = require('../Cron/updateValues');

router.get('/currency/main', Currency.searchMainCurrency);
router.get('/currency/all', Currency.getAll);
router.get('/currency/:currencyName', Currency.getCurrency);
router.post('/currency/new', Currency.createCurrency);
router.put('/currency/update', Currency.updateCurrency);
router.get('/currency/code/:code', Currency.searchByCode);


module.exports = router;
