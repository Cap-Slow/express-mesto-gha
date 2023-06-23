const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  UNAUTHORIZED_CODE,
  UNAUTHORIZED_MESSAGE,
  JWT_SECRET,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) {
      return false;
    }
    const isUserExist = User.findById(decoded._id).then((user) => {
      return Boolean(user);
    });
    if (!isUserExist) {
      res.status(UNAUTHORIZED_CODE).send({ message: UNAUTHORIZED_MESSAGE });
      return;
    }
    req.user._id = decoded._id;
  });
  next();
};
