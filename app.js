const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
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
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
