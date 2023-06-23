const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./constants');
const User = require('../models/user');

function generateToken(_id) {
  const token = jwt.sign({ _id }, JWT_SECRET, {
    expiresIn: '7d',
  });
  return token;
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) {
      return false;
    }
    return User.findById(decoded._id).then((user) => {
      return Boolean(user);
    });
  });
}

module.exports = { generateToken, verifyToken };
