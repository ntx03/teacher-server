const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const BadRequest = require('../errors/BadRequest');

// валидируем URL
const validationUrl = (url) => {
  const validate = isUrl(url);
  if (validate) {
    return url;
  }
  throw new BadRequest('Некорректный адрес URL');
};

// валидируем создание пользователя
const createUserValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// валидиуем почту и пароль
const validationLogin = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
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

// !!валидируем добавление блока с фотографиями
const createPhotoBlockValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).required(),
    photo: Joi.array().required(),
  }),
});

// !!валидируем добавление видео
const createVideoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(5).required(),
    link: Joi.string().required().custom(validationUrl),
  }),
});

// обновляем заголовок
const updateTitleMainValidation = celebrate({
  body: Joi.object().keys({
    title: Joi.array().required(),
  }),
  query: {
    id: Joi.string().hex().length(24).required(),
  },
});

// обновляем текст
const updateTextMainValidation = celebrate({
  body: Joi.object().keys({
    text: Joi.array().required(),
  }),
  query: {
    id: Joi.string().hex().length(24).required(),
  },
});

// обновляем фотографию
const updatePhotoMainValidation = celebrate({
  body: Joi.object().keys({
    url: Joi.string().required().custom(validationUrl),
    alt: Joi.string().required(),
  }),
  query: {
    id: Joi.string().hex().length(24).required(),
  },
});

// !!валидируем добавление на главную страничк
const createMainValidation = celebrate({
  body: Joi.object().keys({
    title: Joi.array(),
    text: Joi.array(),
    url: Joi.string().custom(validationUrl),
    alt: Joi.string(),
  }),
});

// валидируем заголовок id query
const validationQuery = celebrate({
  query: {
    id: Joi.string().hex().length(24),
  },
});

module.exports = {
  createPhotoValidation,
  createMainValidation,
  validationLogin,
  createUserValid,
  updateTitleMainValidation,
  updateTextMainValidation,
  updatePhotoMainValidation,
  createPhotoBlockValidation,
  validationQuery,
  createVideoValidation,
};
