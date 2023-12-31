const express = require('express');
const path = require('path');

const app = express();
const morgan = require('morgan');
const cors = require('cors');

const port = process.env.PORT || 3000;
require('./config/db');

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pdf'));
app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`Server running at PORT ${port}...`);
});
