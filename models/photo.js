const mongoose = require('mongoose');

const photosShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: Array,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user',
  },
});

module.exports = mongoose.model('photos', photosShema);
