const router = require('express').Router();
const authenticated = require('../middleware/authenticate');
const adminMiddleware = require('../middleware/adminauth');
const { createMovieController, getMoviesById,listMovieAndTvShow,getMovieAndTvshow} = require('../controller/movieController');

router.post('/createmovie',adminMiddleware, createMovieController);

router.get('/movies/:id', authenticated, getMoviesById);
router.get('/media', authenticated, listMovieAndTvShow);
router.get('/getmovie', authenticated, getMovieAndTvshow);

module.exports = router;
