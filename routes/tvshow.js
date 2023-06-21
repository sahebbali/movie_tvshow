const router = require('express').Router();
const adminMiddleware = require('../middleware/adminauth');

const authenticated = require('../middleware/authenticate');
const { createTvshowController, getTvshowById } = require('../controller/tvshowController');

router.post('/createtvshow',adminMiddleware, createTvshowController);

router.get('/tvshows/:id',authenticated, getTvshowById);

module.exports = router;
