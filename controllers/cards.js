const Card = require('../models/card');
const {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
  BAD_REQUEST_CARD_MESSAGE,
  NOT_FOUND_CARDID,
} = require('../utils/constants');

function getCards(req, res) {
  return Card.find({})
    .select('-__v')
    .then((cards) => res.status(200).send(cards))
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
      return res.status(201).send(cardWithoutVersion);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
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

function deleteCard(req, res) {
  const { cardId } = req.params;
  return Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_CARDID });
        return;
      }
      res.status(200).send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_CODE).send({
          message: BAD_REQUEST_CARD_MESSAGE,
        });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE });
    });
}

function addCardLike(req, res) {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .select('-__v')
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_CARDID });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
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
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
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
