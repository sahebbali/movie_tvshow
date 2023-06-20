const router = require('express').Router();
const authenticated = require('../middleware/authenticate');
const { createMovieController, getMoviesById,listMovieAdnTvshow } = require('../controller/movieController');

router.post('/createmovie', createMovieController);

router.get('/movies/:id', getMoviesById);
router.get('/media', listMovieAdnTvshow);

module.exports = router;
