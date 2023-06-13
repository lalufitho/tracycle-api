const express = require('express')
const router = express.Router()

router.use('/transaksi', require('./transaksi.route'))

module.exports = router