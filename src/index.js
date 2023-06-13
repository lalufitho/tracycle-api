const express = require('express');
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const port = process.env.PORT || 3000;
require('./config/db');

app.use(express.json())
app.use(cors())
app.use(morgan('combined'));

app.use('/transaksi', require('./routes/transaksi.route'));

// app.use('/feedback', require('./routes/feedback.route'));

app.listen(port, () => {
    console.log(`Server running at PORT ${port}...`);
});