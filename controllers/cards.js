const Card = require('../models/card');
const NotFoundError = require('../utils/errors/notFoundError');
const ForbiddenError = require('../utils/errors/forbiddenError');

const {
  OK_CODE,
  CREATED_CODE,
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
  NOT_FOUND_CARDID,
  FORBIDDEN_CARD_DELETE_MESSAGE,
} = require('../utils/constants');

function getCards(req, res) {
  return Card.find({})
    .select('-__v')
    .then((cards) => res.status(OK_CODE).send(cards))
    .catch(() => {
      res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE });
    });
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      const cardWithoutVersion = card.toObject();
      delete cardWithoutVersion.__v;
      return res.status(CREATED_CODE).send(cardWithoutVersion);
    })
    .catch(next);
}

function deleteCard(req, res, next) {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(NOT_FOUND_CARDID);
      }
      if (card.owner !== req.user._id) {
        throw new ForbiddenError(FORBIDDEN_CARD_DELETE_MESSAGE);
      }
    })
    .then(() => Card.findByIdAndRemove(cardId))
    .then((card) => {
      if (!card) {
        throw new NotFoundError(NOT_FOUND_CARDID);
      }
      res.status(OK_CODE).send({ message: 'Карточка удалена' });
    })
    .catch(next);
}

function addCardLike(req, res, next) {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.params._id } },
    { new: true }
  )
    .select('-__v')
    .then((card) => {
      if (!card) {
        throw new NotFoundError(NOT_FOUND_CARDID);
      }
      res.status(OK_CODE).send(card);
    })
    .catch(next);
}

function removeCardLike(req, res, next) {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .select('-__v')
    .then((card) => {
      if (!card) {
        throw new NotFoundError(NOT_FOUND_CARDID);
      }
      res.status(OK_CODE).send(card);
    })
    .catch(next);
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  removeCardLike,
};
