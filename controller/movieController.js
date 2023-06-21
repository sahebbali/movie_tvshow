
const Movie = require('../models/MovieModel')
const TVShow = require('../models/TvshowModel')

// Create a movie (only for authenticated users)
const createMovieController = async (req, res, next) => {

    try {

      const { title, director, releaseYear,runtime } = req.body;
  
      // Validate required fields
      if (!title || !director || !releaseYear ||!runtime) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Check if the movie already exists
      const existingMovie = await Movie.findOne({ title: title }).exec();
       if (existingMovie) {
        return res.status(409).json({ error: 'Movie already exists' });
      }
  
      // Create a new movie object
      const movie = new Movie({
        title,
        director,
        releaseYear,
        actors: req.body.actors || [], // Optional actors field
        producer: req.body.producer || '', // Optional producer field
        tvShow: req.body.tvShow || null, // Optional TV show reference
        runtime: req.body.runtime || 0,
      });
  
      // Save the movie to the database
      await movie.save();
  
      res.json(movie);
    } catch (err) {
      console.error('Error creating movie:', err);
      res.status(500).json({ error: 'Failed to create movie' });
    }
  };
  
  // Get the details of a specific movie
const getMoviesById = async (req, res, next) => {

        const movieId = req.params.id;
      
        try {
          const movie = await Movie.findById(movieId);
          if (!movie) {
            res.status(404).json({ error: 'Movie not found' });
          } else {
            res.json(movie);
          }
        } catch (err) {
          console.error('Error retrieving movie:', err);
          res.status(500).json({ error: 'Failed to retrieve movie' });
        }
  
      
  };

  // Get a list of movies and TV shows and show one
  const listMovieAndTvShow = async (req, res) => {
    try {
      const movies = await Movie.find().populate('director producer');
      const tvShows = await TVShow.find().populate('creators');
      const movieCount = await Movie.countDocuments();
      const tvShowCount = await TVShow.countDocuments();
  
      // Select one random movie and TV show
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      const randomTvShow = tvShows[Math.floor(Math.random() * tvShows.length)];
      const media = {
        movies: randomMovie,
     
      };
  
      res.json({
        totalCounts: {
          "Total Movie": movieCount,
          "Total TV Show": tvShowCount,
        },
        media: media,
      });
    } catch (err) {
      console.error('Error retrieving media:', err);
      res.status(500).json({ error: 'Failed to retrieve media' });
    }
  };
  
  const getMovieAndTvshow = async(req,res)=>{
    try {
        const movies = await Movie.find().populate('director producer');
        const tvShows = await TVShow.find().populate('creators');

        
        const getMedia = {
          movies,
          tvShows,
        };
        res.json({ 
          getMedia
          });
      } catch (err) {
        console.error('Error retrieving media:', err);
        res.status(500).json({ error: 'Failed to retrieve media' });
      }
  }


module.exports = { createMovieController, getMoviesById, listMovieAndTvShow,getMovieAndTvshow , };
