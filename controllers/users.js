const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  OK_CODE,
  CREATED_CODE,
  BAD_REQUEST_CODE,
  UNAUTHORIZED_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
  NOT_FOUND_USERID,
  BAD_REQUEST_USER_MESSAGE,
  WRONG_CREDENTIALS_MESSAGE,
} = require('../utils/constants');
const { generateToken } = require('../utils/jwt');

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
      res.status(OK_CODE).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST_CODE).send({
          message: BAD_REQUEST_USER_MESSAGE,
        });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE });
    });
}

function createUser(req, res) {
  const { name, about, avatar, email } = req.body;
  bcrypt.hash(req.body.password, 10).then((hash) => {
    return User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => {
        const userWithoutVersion = user.toObject();
        delete userWithoutVersion.__v;
        return res.status(CREATED_CODE).send(userWithoutVersion);
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
  });
}
function updateDataDecorator(updateFunction) {
  return function handleErrors(req, res) {
    return updateFunction(req, res)
      .select('-__v')
      .then((user) => {
        if (!user) {
          res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_USERID });
          return;
        }
        res.status(OK_CODE).send(user);
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
  };
}

function updateAvatar(req) {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  );
}

function updateProfile(req) {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  );
}

const decoratedUpdateAvatar = updateDataDecorator(updateAvatar);
const decoratedUpdateProfile = updateDataDecorator(updateProfile);

function login(req, res) {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res
          .status(UNAUTHORIZED_CODE)
          .send({ message: WRONG_CREDENTIALS_MESSAGE });
        return;
      }
      bcrypt.compare(password, user.password, function (err, isPasswordMatch) {
        if (!isPasswordMatch) {
          res
            .status(UNAUTHORIZED_CODE)
            .send({ message: WRONG_CREDENTIALS_MESSAGE });
          return;
        }
        const token = generateToken(user._id);
        res
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          })
          .end();
      });
    })
    .catch((err) => {
      res.status(UNAUTHORIZED_CODE).send({ message: err.message });
    });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  decoratedUpdateAvatar,
  decoratedUpdateProfile,
  login,
};
