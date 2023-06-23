const userRoutes = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  decoratedUpdateAvatar,
  decoratedUpdateProfile,
  login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

userRoutes.post('/signup', createUser);
userRoutes.post('/signin', login);
userRoutes.get('/users', auth, getUsers);
userRoutes.get('/users/:userId', auth, getUserById);
userRoutes.patch('/users/me', auth, decoratedUpdateProfile);
userRoutes.patch('/users/me/avatar', auth, decoratedUpdateAvatar);

module.exports = userRoutes;
