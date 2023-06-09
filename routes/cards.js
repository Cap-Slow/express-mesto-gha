const cardRoutes = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  removeCardLike,
} = require('../controllers/cards');

cardRoutes.get('/cards', getCards);
cardRoutes.post('/cards', createCard);
cardRoutes.delete('/cards/:cardId', deleteCard);
cardRoutes.put('/cards/:cardId/likes', addCardLike);
cardRoutes.delete('/cards/:cardId/likes', removeCardLike);

module.exports = cardRoutes;
