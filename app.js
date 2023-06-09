const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/users');
const cardRouter = require('./routes/cards');
const { PORT = 3000 } = process.env;
mongoose
  .connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  });

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64833a11170f2abbe81887b6',
  };

  next();
});
app.use(router);
app.use(cardRouter);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
