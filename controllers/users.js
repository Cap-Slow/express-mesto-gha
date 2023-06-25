const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/notFoundError');
const UnauthorizedError = require('../utils/errors/unauthorizedError');
const {
  OK_CODE,
  CREATED_CODE,
  NOT_FOUND_USERID,
  WRONG_CREDENTIALS_MESSAGE,
  JWT_SECRET,
  AUTH_SUCCESS_MESSAGE,
} = require('../utils/constants');

function getUsers(req, res, next) {
  return User.find({})
    .select('-__v')
    .then((users) => res.send(users))
    .catch(next);
}

function getUserById(req, res, next) {
  const { userId } = req.params;
  return User.findById(userId)
    .select('-__v')
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_USERID);
      }
      res.status(OK_CODE).send(user);
    })
    .catch(next);
}

function createUser(req, res, next) {
  const { name, about, avatar, email } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }).then((user) => {
        const userWithoutVersion = user.toObject();
        delete userWithoutVersion.__v;
        delete userWithoutVersion.password;
        return res.status(CREATED_CODE).send(userWithoutVersion);
      })
    )
    .catch(next);
}
function updateDataDecorator(updateFunction) {
  return function handleErrors(req, res, next) {
    return updateFunction(req, res, next)
      .select('-__v')
      .then((user) => {
        if (!user) {
          throw new NotFoundError(NOT_FOUND_USERID);
        }
        res.status(OK_CODE).send(user);
      })
      .catch(next);
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

function login(req, res, next) {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(WRONG_CREDENTIALS_MESSAGE);
      }
      bcrypt.compare(password, user.password, (err, isPasswordMatch) => {
        if (!isPasswordMatch) {
          throw new UnauthorizedError(WRONG_CREDENTIALS_MESSAGE);
        }
        const { _id } = user;
        const token = jwt.sign({ _id }, JWT_SECRET, {
          expiresIn: '7d',
        });
        res
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          })
          .status(OK_CODE)
          .send({ message: AUTH_SUCCESS_MESSAGE });
      });
    })
    .catch(next);
}

function getUserInfo(req, res, next) {
  const userId = req.user._id;
  return User.findById(userId)
    .select('-__v')
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_USERID);
      }
      res.status(OK_CODE).send(user);
    })
    .catch(next);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  decoratedUpdateAvatar,
  decoratedUpdateProfile,
  login,
  getUserInfo,
};
