const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  actors: [{
    type: String,
    required: true,
  }],
  director: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
  },
  runtime:{
    type: Number,
    required: true,
  },
  tvShow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TVShow',
  },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;