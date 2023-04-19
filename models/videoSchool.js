const mongoose = require('mongoose');

const videosSchoolShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user',
  },
});

module.exports = mongoose.model('videosSchool', videosSchoolShema);
