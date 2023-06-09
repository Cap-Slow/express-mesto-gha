const User = require('../models/user');

function getUsers(req, res) {
  return User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
}

function getUserById(req, res) {
  const { userId } = req.params;
  return User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      return res.status(200).send(user);
    })
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
