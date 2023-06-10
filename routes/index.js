const routes = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { NOT_FOUND_CODE, NOT_FOUND_ROUTE } = require('../utils/constants');

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);
routes.use('*', (req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_ROUTE });
});

module.exports = routes;
