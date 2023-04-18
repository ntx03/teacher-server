const Main = require('../models/main');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');
// const Forbidden = require('../errors/Forbidden');

// Добавляем фильм;
const createMain = (req, res, next) => {
  const { title, text, url, alt } = req.body;
  const owner = req.user._id;
  Main.create({
    title,
    text,
    url,
    alt,
    owner,
  })
    .then((main) => res.status(200).send({ main }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Такая новость уже существует.'));
      }
      if (err.name === 'ValidationError') {
        next(
          new BadRequest('Переданы некорректные данные при добавлении новости!')
        );
      } else {
        next(err);
      }
    });
};

// получаем все новости
const allMain = (req, res, next) => {
  Main.find({})
    .then((main) => res.status(200).send(main))
    .catch(next);
};

// обновляем заголовок на главной странице
const updateTitleMain = (req, res, next) => {
  const { id } = req.query;
  const { title } = req.body;
  Main.findByIdAndUpdate(id, { title }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound('Пользователь с указанным _id не найден');
    })
    .then((user) => {
      res.status(200).json({
        title: user.title,
      });
    })
    .catch((err) => {
      next(err);
    });
};

// обновляем текст на главной странице
const updateTextMain = (req, res, next) => {
  const { id } = req.query;
  const { text } = req.body;
  Main.findByIdAndUpdate(id, { text }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound('Пользователь с указанным _id не найден');
    })
    .then((data) => {
      res.status(200).json({
        text: data.text,
      });
    })
    .catch((err) => {
      next(err);
    });
};

// обновляем  фотографию на главной странице
const updatePhotoMain = (req, res, next) => {
  const { id } = req.query;
  const { url, alt } = req.body;
  Main.findByIdAndUpdate(id, { url, alt }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound('Пользователь с указанным _id не найден');
    })
    .then((data) => {
      res.status(200).json({
        url: data.url,
        alt: data.alt,
      });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = {
  allMain,
  createMain,
  updateTitleMain,
  updateTextMain,
  updatePhotoMain,
};
