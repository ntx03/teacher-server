const mongoose = require('mongoose');

const mainShema = new mongoose.Schema({
  url: {
    type: String,
  },
  alt: {
    type: String,
  },
  title: {
    type: Array,
  },
  text: {
    type: Array,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = mongoose.model('main', mainShema);
