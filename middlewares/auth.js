const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { UNAUTHORIZED_MESSAGE } = require('../utils/constants');
const UnauthorizedError = require('../utils/errors/unauthorizedError');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
  }
  let payload;
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
    }
    payload = decoded;
    return payload;
  });
  const isUserExist = User.findById(payload._id).then((user) => Boolean(user));
  if (!isUserExist) {
    throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
  }
  req.user = { _id: payload._id };
  next();
};
