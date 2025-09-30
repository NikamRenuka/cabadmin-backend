// C:\Users\Dell\Downloads\cab\project\server\routes\rates.js
const express = require('express');
const router = express.Router();
const rateController = require('../controllers/rateController');

router.get('/', rateController.getRates);        // GET current rates
router.post('/save', rateController.saveRates);  // POST new rates

module.exports = router;