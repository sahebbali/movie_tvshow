
const Movie = require('../models/MovieModel')
const createMovieController = async (req, res, next) => {
    try {
      const { title, director, releaseYear } = req.body;
  
      // Validate required fields
      if (!title || !director || !releaseYear) {
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
      });
  
      // Save the movie to the database
      await movie.save();
  
      res.json(movie);
    } catch (err) {
      console.error('Error creating movie:', err);
      res.status(500).json({ error: 'Failed to create movie' });
    }
  };
  
  const loginController = async (req, res, next) => {
	const { email, password } = req.body;
  
	try {
	  const user = await User.findOne({ email });
  
	  if (!user) {
		return res.status(404).json({ error: 'User not found' });
	  }
  
	  bcrypt.compare(password, user.password, (err, result) => {
		if (result) {
		  const token = jwt.sign(
			{ id: user.id, username: user.username, role: user.role },
			process.env.SECRET_KEY,
			{ expiresIn: '1h' }
		  );
  
		  // Set the token as a cookie
		  res.cookie('token', token, { httpOnly: true });
		  res.json({ message: 'Authentication successful' });
		} else {
		  res.status(401).json({ error: 'Authentication failed' });
		}
	  });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Internal server error' });
	}
  };


module.exports = { createMovieController, loginController };
