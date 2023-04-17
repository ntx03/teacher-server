const News = require('../models/news');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

// Добавляем фильм;
const createNews = (req, res, next) => {
  const { name, date, description, photo } = req.body;
  const owner = req.user._id;
  News.create({
    name,
    date,
    description,
    photo,
    owner,
  })
    .then((news) => res.status(200).send({ news }))
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
const allNews = (req, res, next) => {
  News.find({})
    .then((news) => res.status(200).send(news))
    .catch(next);
};

// удаляем сохранённый фильм по id
const deleteNews = (req, res, next) => {
  const { _id } = req.body;
  News.findById(_id)
    .orFail(() => {
      throw new NotFound('Новость не найдена.');
    })
    .then((news) => {
      if (news.owner.toString() === req.user._id) {
        return News.findByIdAndRemove(_id).then((item) => {
          res.status(200).send(item);
        });
      }
      throw new Forbidden('В доступе отказано.');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Новость с указанным _id не найдена.'));
      } else {
        next(err);
      }
    });
};
module.exports = {
  createNews,
  allNews,
  deleteNews,
};
