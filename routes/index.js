const router = require('express').Router();
const authRoutes = require('./auth');
const movieRoutes = require('./movie');
const tvshowRoutes = require('./tvshow');

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/movie', movieRoutes);
router.use('/api/v1/tvshow', tvshowRoutes);


module.exports = router;
