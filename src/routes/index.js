const express = require('express');

const router = express.Router();

router.use('/transaksi', require('./transaksi.route'));
router.use('/feedback', require('./feedback.route'));

module.exports = router;
