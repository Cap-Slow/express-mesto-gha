const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(routes);
app.listen(PORT);
