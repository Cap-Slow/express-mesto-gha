const Card = require('../models/card');

function getCards(req, res) {
  return Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
}

function deleteCard(req, res) {
  const { cardId } = req.params;
  return Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Нет карточки с таким id' });
        return;
      }
      return res.status(200).send({ message: 'Карточка удалена' });
    })
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
}

function addCardLike(req, res) {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Нет карточки с таким id' });
        return;
      }
      return res.status(200).send(card);
    })
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
}

function removeCardLike(req, res) {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Нет карточки с таким id' });
        return;
      }
      return res.status(200).send(card);
    })
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  removeCardLike,
};
