const OK_CODE = 200;
const CREATED_CODE = 201;
const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const FORBIDDEN_CODE = 403;
const NOT_FOUND_CODE = 404;
const CONFLICT_CODE = 409;
const CELEBRATE_CONFLICT_CODE = 11000;
const SERVER_ERR_CODE = 500;
const SERVER_ERR_MESSAGE = 'На сервере произошла ошибка.';
const NOT_FOUND_USERID = 'Пользователь с указанным id не найден.';
const NOT_FOUND_CARDID = 'Карточка с указанным id не найдена.';
const NOT_FOUND_ROUTE = 'Запрашиваемый ресурс не найден.';
const VALIDATION_ERR_MESSAGE = 'Ошибка валидации.';
const UNAUTHORIZED_MESSAGE = 'Нет доступа.';
const WRONG_CREDENTIALS_MESSAGE = 'Неправильные почта или пароль.';
const FORBIDDEN_CARD_DELETE_MESSAGE = 'Нельзя удалять чужие карточки.';
const EXISTING_EMAIL_MESSAGE = 'Пользователь с таким email уже существует.';
const AUTH_SUCCESS_MESSAGE = 'Успешная авторизация.';
const JWT_SECRET = '$2a$10$gOXyY6P9lOuZC.LUd8reVegJIe0veD4GSnnKHJEyj/T1u';
module.exports = {
  OK_CODE,
  CREATED_CODE,
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  FORBIDDEN_CODE,
  CONFLICT_CODE,
  SERVER_ERR_CODE,
  CELEBRATE_CONFLICT_CODE,
  UNAUTHORIZED_CODE,
  SERVER_ERR_MESSAGE,
  NOT_FOUND_USERID,
  NOT_FOUND_CARDID,
  NOT_FOUND_ROUTE,
  JWT_SECRET,
  UNAUTHORIZED_MESSAGE,
  WRONG_CREDENTIALS_MESSAGE,
  FORBIDDEN_CARD_DELETE_MESSAGE,
  EXISTING_EMAIL_MESSAGE,
  VALIDATION_ERR_MESSAGE,
  AUTH_SUCCESS_MESSAGE,
};
