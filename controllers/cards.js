const mongoose = require('mongoose');
const Card = require('../models/card');

const {
  OK_CODE,
  CREATED_CODE,
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  FORBIDDEN_CODE,
  SERVER_ERROR_MESSAGE,
  BAD_REQUEST_CARD_MESSAGE,
  NOT_FOUND_CARDID,
  FORBIDDEN_CARD_DELETE_MESSAGE,
} = require('../utils/constants');
const card = require('../models/card');

function getCards(req, res) {
  return Card.find({})
    .select('-__v')
    .then((cards) => res.status(OK_CODE).send(cards))
    .catch(() => {
      res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE });
    });
}
function createCard(req, res) {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id })

    .then((card) => {
      const cardWithoutVersion = card.toObject();
      delete cardWithoutVersion.__v;
      return res.status(CREATED_CODE).send(cardWithoutVersion);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST_CODE).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE });
    });
}

async function deleteCard(req, res) {
  const { cardId } = req.params;
  const cardOwner = await Card.findById(cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_CARDID });
        return;
      }
      return card.owner;
    })
    .catch(() => {
      res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE });
    });
  if (cardOwner != req.user._id) {
    res.status(FORBIDDEN_CODE).send({
      message: FORBIDDEN_CARD_DELETE_MESSAGE,
    });
    return;
  }
  return Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_CARDID });
        return;
      }
      res.status(OK_CODE).send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST_CODE).send({
          message: BAD_REQUEST_CARD_MESSAGE,
        });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE });
    });
}

async function addCardLike(req, res) {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.params._id } },
    { new: true }
  )
    .select('-__v')
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_CARDID });
        return;
      }
      res.status(OK_CODE).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST_CODE).send({
          message: BAD_REQUEST_CARD_MESSAGE,
        });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE });
    });
}

function removeCardLike(req, res) {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .select('-__v')
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_CARDID });
        return;
      }
      res.status(OK_CODE).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST_CODE).send({
          message: BAD_REQUEST_CARD_MESSAGE,
        });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE });
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  removeCardLike,
};
