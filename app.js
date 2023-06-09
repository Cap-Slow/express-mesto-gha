const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
