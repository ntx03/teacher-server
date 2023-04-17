const { celebrate, Joi } = require('celebrate');
// const isUrl = require('validator/lib/isURL');
// const BadRequest = require('../errors/BadRequest');

// валидируем URL
// const validationUrl = (url) => {
//   const validate = isUrl(url);
//   if (validate) {
//     return url;
//   }
//   throw new BadRequest('Некорректный адрес URL');
// };

// валидируем создание пользователя
const createUserValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// !!валидируем добавление новости
const createPhotoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(8).required(),
    date: Joi.string().min(8).required(),
    description: Joi.string().min(8).required(),
    photo: Joi.array().required(),
  }),
});

// валидиуем почту и пароль
const validationLogin = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

// валидируем заголовок id фильма
const validationParamsDeleteMovie = celebrate({
  params: {
    _id: Joi.string().hex().length(24),
  },
});

module.exports = {
  createPhotoValidation,
  validationLogin,
  createUserValid,
  validationParamsDeleteMovie,
};
