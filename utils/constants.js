const OK_CODE = 200;
const CREATED_CODE = 201;
const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const FORBIDDEN_CODE = 403;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;
const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';
const BAD_REQUEST_USER_MESSAGE = 'Передан некорректный id пользователя.';
const BAD_REQUEST_CARD_MESSAGE = 'Передан некорректный id карточки.';
const NOT_FOUND_USERID = 'Пользователь с указанным id не найден.';
const NOT_FOUND_CARDID = 'Карточка с указанным id не найдена.';
const NOT_FOUND_ROUTE = 'Запрашиваемый ресурс не найден';
const UNAUTHORIZED_MESSAGE = 'Нет доступа';
const WRONG_CREDENTIALS_MESSAGE = 'Неправильные почта или пароль';
const FORBIDDEN_CARD_DELETE_MESSAGE = 'Нельзя удалять чужие карточки';
const JWT_SECRET = '$2a$10$gOXyY6P9lOuZC.LUd8reVegJIe0veD4GSnnKHJEyj/T1u';
module.exports = {
  OK_CODE,
  CREATED_CODE,
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  FORBIDDEN_CODE,
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
  BAD_REQUEST_USER_MESSAGE,
  BAD_REQUEST_CARD_MESSAGE,
  NOT_FOUND_USERID,
  NOT_FOUND_CARDID,
  NOT_FOUND_ROUTE,
  UNAUTHORIZED_CODE,
  JWT_SECRET,
  UNAUTHORIZED_MESSAGE,
  WRONG_CREDENTIALS_MESSAGE,
  FORBIDDEN_CARD_DELETE_MESSAGE,
};
