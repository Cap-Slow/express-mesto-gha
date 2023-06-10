const cardRoutes = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  removeCardLike,
} = require('../controllers/cards');

cardRoutes.get('', getCards);
cardRoutes.post('', createCard);
cardRoutes.delete('/:cardId', deleteCard);
cardRoutes.put('/:cardId/likes', addCardLike);
cardRoutes.delete('/:cardId/likes', removeCardLike);

module.exports = cardRoutes;
