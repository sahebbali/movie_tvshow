const router = require('express').Router();
const { createTvshowController, loginController } = require('../controller/tvshowController');

router.post('/createtvshow', createTvshowController);

router.post('/login', loginController);

module.exports = router;
