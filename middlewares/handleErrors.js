const { isCelebrateError } = require('celebrate');
const {
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
  BAD_REQUEST_CODE,
  CONFLICT_CODE,
  CELEBRATE_CONFLICT_CODE,
  EXISTING_EMAIL_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
} = require('../utils/constants');
module.exports = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR_CODE, message = SERVER_ERROR_MESSAGE } =
    err;
  if (err.code === CELEBRATE_CONFLICT_CODE) {
    res.status(CONFLICT_CODE).send({ message: EXISTING_EMAIL_MESSAGE });
    return;
  }
  if (isCelebrateError(err)) {
    console.dir(err);
    res.status(BAD_REQUEST_CODE).send({ message: VALIDATION_ERROR_MESSAGE });
    return;
  }
  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR_CODE ? SERVER_ERROR_MESSAGE : message,
  });
};
