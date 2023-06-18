
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User')
const registerController = async (req, res, next) => {
	const { name, email, password, role } = req.body;
	
	try {
	  const existingUser = await User.findOne({ email });
	
	  if (existingUser) {
		return res.status(409).json({ error: 'Email already exists' });
	  }
	
	  const hashedPassword = await bcrypt.hash(password, 10);
	
	  const newUser = new User({
		name,
		email,
		password: hashedPassword,
		role,
	  });
	
	  await newUser.save();
	
	  res.json({ message: 'Registration successful' });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Internal server error' });
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


module.exports = { registerController, loginController };
