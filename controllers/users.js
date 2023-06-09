const User = require('../models/user');
const {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
  NOT_FOUND_USERID,
} = require('../utils/constants');

function getUsers(req, res) {
  return User.find({})
    .select('-__v')
    .then((users) => res.send(users))
    .catch(() => {
      res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE });
    });
}

function getUserById(req, res) {
  const { userId } = req.params;
  return User.findById(userId)
    .select('-__v')
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_USERID });
        return;
      }
      res.status(200).send(user);
    })
    .catch(() => {
      res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE });
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => {
      const userWithoutVersion = user.toObject();
      delete userWithoutVersion.__v;
      return res.status(201).send(userWithoutVersion);
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

function updateProfile(req, res) {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .select('-__v')
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_USERID });
        return;
      }
      res.status(200).send(user);
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

function updateAvatar(req, res) {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .select('-__v')
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_USERID });
        return;
      }
      res.status(200).send(user);
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

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
