const router = require('express').Router();
const { createMovieController, loginController } = require('../controller/movieController');

router.post('/createmovie', createMovieController);

router.post('/getmovie', loginController);

module.exports = router;
