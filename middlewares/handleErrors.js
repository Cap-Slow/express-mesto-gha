const { isCelebrateError } = require('celebrate');
const {
  SERVER_ERR_CODE,
  SERVER_ERR_MESSAGE,
  BAD_REQUEST_CODE,
  CONFLICT_CODE,
  CELEBRATE_CONFLICT_CODE,
  EXISTING_EMAIL_MESSAGE,
  VALIDATION_ERR_MESSAGE,
} = require('../utils/constants');

module.exports = (err, req, res) => {
  const { statusCode = SERVER_ERR_CODE, message = SERVER_ERR_MESSAGE } = err;
  if (err.code === CELEBRATE_CONFLICT_CODE) {
    res.status(CONFLICT_CODE).send({ message: EXISTING_EMAIL_MESSAGE });
    return;
  }
  if (isCelebrateError(err)) {
    res.status(BAD_REQUEST_CODE).send({ message: VALIDATION_ERR_MESSAGE });
    return;
  }
  res.status(statusCode).send({
    message: statusCode === SERVER_ERR_CODE ? SERVER_ERR_MESSAGE : message,
  });
};
