const router = require('express').Router();
const authenticated = require('../middleware/authenticate');
const { createTvshowController, getTvshowById } = require('../controller/tvshowController');

router.post('/createtvshow',authenticated, createTvshowController);

router.get('/tvshows/:id',authenticated, getTvshowById);

module.exports = router;
