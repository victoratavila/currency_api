const express = require('express');
const router = express.Router();
const Currency = require('../Controllers/Currency');
const cron = require('../Cron/updateValues');

router.get('/all', Currency.getAll);
router.get('/:currencyName', Currency.getCurrency);
router.post('/new', Currency.createCurrency);
router.put('/update', Currency.updateCurrency);


module.exports = router;
