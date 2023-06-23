const userRoutes = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  decoratedUpdateAvatar,
  decoratedUpdateProfile,
  login,
} = require('../controllers/users');

userRoutes.get('/users', getUsers);
userRoutes.get('/users/:userId', getUserById);
userRoutes.post('/signup', createUser);
userRoutes.post('/signin', login);
userRoutes.patch('/users/me', decoratedUpdateProfile);
userRoutes.patch('/users/me/avatar', decoratedUpdateAvatar);

module.exports = userRoutes;
