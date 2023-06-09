const routes = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');

routes.use(userRoutes);
routes.use(cardRoutes);

module.exports = routes;
