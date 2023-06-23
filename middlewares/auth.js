const { verifyToken } = require('../utils/jwt');
const {
  UNAUTHORIZED_CODE,
  UNAUTHORIZED_MESSAGE,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  if (!verifyToken(req.cookies.jwt)) {
    res.status(UNAUTHORIZED_CODE).send({ message: UNAUTHORIZED_MESSAGE });
    return;
  }
  next();
};
