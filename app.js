require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes');
const handleErrors = require('./middlewares/handleErrors');

const { PORT = 3000, DATABASE_PATH } = process.env;
mongoose.connect(DATABASE_PATH || 'mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(routes);
app.use(errors());
app.use(handleErrors);

app.listen(PORT);
