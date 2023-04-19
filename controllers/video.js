const Video = require('../models/video');
const VideoSchool = require('../models/videoSchool');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

// Добавляем видео профориентации;
const createVideo = (req, res, next) => {
  const { name, link } = req.body;
  console.log(req.body);
  const owner = req.user._id;
  Video.create({
    name,
    link,
    owner,
  })
    .then((videos) => res.status(200).send({ videos }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('уже существует.'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные!'));
      } else {
        next(err);
      }
    });
};

// Добавляем видео школьной жизни;
const createVideoSchool = (req, res, next) => {
  const { name, link } = req.body;
  console.log(req.body);
  const owner = req.user._id;
  VideoSchool.create({
    name,
    link,
    owner,
  })
    .then((videos) => res.status(200).send({ videos }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('уже существует.'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные!'));
      } else {
        next(err);
      }
    });
};

// получаем все видео профориентации
const allVideo = (req, res, next) => {
  Video.find({})
    .then((video) => res.status(200).send(video))
    .catch(next);
};

// получаем все видео профориентации
const allVideoSchool = (req, res, next) => {
  VideoSchool.find({})
    .then((video) => res.status(200).send(video))
    .catch(next);
};

// удаляем видео профориентации по id
const deleteVideo = (req, res, next) => {
  const { id } = req.query;
  Video.findById(id)
    .orFail(() => {
      throw new NotFound('Новость не найдена.');
    })
    .then((video) => {
      if (video.owner.toString() === req.user._id) {
        return Video.findByIdAndRemove(id).then((item) => {
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

// удаляем видео профориентации по id
const deleteVideoSchool = (req, res, next) => {
  const { id } = req.query;
  VideoSchool.findById(id)
    .orFail(() => {
      throw new NotFound('Новость не найдена.');
    })
    .then((video) => {
      if (video.owner.toString() === req.user._id) {
        return VideoSchool.findByIdAndRemove(id).then((item) => {
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
  createVideo,
  createVideoSchool,
  allVideo,
  allVideoSchool,
  deleteVideo,
  deleteVideoSchool,
};
