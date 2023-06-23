const routes = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');
const { NOT_FOUND_CODE, NOT_FOUND_ROUTE } = require('../utils/constants');

routes.use('', userRoutes);
routes.use('/cards', auth, cardRoutes);
routes.use('*', (req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_ROUTE });
});

module.exports = routes;
