const Photo = require('../models/photo');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

// Добавляем блок с фотографиями;
const createPhoto = (req, res, next) => {
  const { name, photo } = req.body;
  console.log(req.body);
  const owner = req.user._id;
  Photo.create({
    name,
    photo,
    owner,
  })
    .then((photos) => res.status(200).send({ photos }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Такая новость уже существует.'));
      }
      if (err.name === 'ValidationError') {
        next(
          new BadRequest(
            'Переданы некорректные данные при добавлении блока с фотографиями!'
          )
        );
      } else {
        next(err);
      }
    });
};
// получаем все новости
const allPhoto = (req, res, next) => {
  Photo.find({})
    .then((photos) => res.status(200).send(photos))
    .catch(next);
};

// удаляем блок с фотографиями по id
const deletePhoto = (req, res, next) => {
  const { id } = req.query;
  Photo.findById(id)
    .orFail(() => {
      throw new NotFound('Новость не найдена.');
    })
    .then((photo) => {
      if (photo.owner.toString() === req.user._id) {
        return Photo.findByIdAndRemove(id).then((item) => {
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
  createPhoto,
  allPhoto,
  deletePhoto,
};
