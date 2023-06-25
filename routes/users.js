const userRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  createUser,
  decoratedUpdateAvatar,
  decoratedUpdateProfile,
  login,
  getUserInfo,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

userRoutes.post(
  '/signup',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().pattern(
          /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*\/?$/i
        ),
      })
      .unknown(true),
  }),
  createUser
);

userRoutes.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);

userRoutes.get('/users', auth, getUsers);

userRoutes.get(
  '/users/me',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24),
    }),
  }),
  auth,
  getUserInfo
);

userRoutes.get(
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24),
    }),
  }),
  auth,
  getUserById
);

userRoutes.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  auth,
  decoratedUpdateProfile
);

userRoutes.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .pattern(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*\/?$/i),
    }),
  }),
  auth,
  decoratedUpdateAvatar
);

module.exports = userRoutes;
