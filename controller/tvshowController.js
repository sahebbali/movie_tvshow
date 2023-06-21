
const TVShow = require('../models/TvshowModel')
 
// create TV show
const createTvshowController = async (req, res) => {
    try {
        const { title, releaseYear, actors, creators,seasons } = req.body;
    
        // Validate required fields
        if (!title || !releaseYear || !actors || !creators || !seasons) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
    
        // Create a new TV show object
        const tvShow = new TVShow({
          title,
          releaseYear,
          actors,
          creators,
          seasons
        });
    
        // Save the TV show to the database
        await tvShow.save();
    
        res.json(tvShow);
      } catch (err) {
        console.error('Error creating TV show:', err);
        res.status(500).json({ error: 'Failed to create TV show' });
      }
  };
  
  // Get the details of a specific TV show
  const getTvshowById = async (req, res) => {
	
        const tvShowId = req.params.id;
      
        try {
          const tvShow = await TVShow.findById(tvShowId);
          if (!tvShow) {
            res.status(404).json({ error: 'TV show not found' });
          } else {
            res.json(tvShow);
          }
        } catch (err) {
          console.error('Error retrieving TV show:', err);
          res.status(500).json({ error: 'Failed to retrieve TV show' });
        }
    
  };


module.exports = { createTvshowController, getTvshowById };
