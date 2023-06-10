const userRoutes = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  decoratedUpdateAvatar,
  decoratedUpdateProfile,
} = require('../controllers/users');

userRoutes.get('', getUsers);
userRoutes.get('/:userId', getUserById);
userRoutes.post('', createUser);
userRoutes.patch('/me', decoratedUpdateProfile);
userRoutes.patch('/me/avatar', decoratedUpdateAvatar);

module.exports = userRoutes;
