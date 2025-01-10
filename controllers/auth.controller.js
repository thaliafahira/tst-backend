const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const existingUser = await User.findOne({ email });

		if (existingUser) return res.status(400).json({ message: 'User already exists' });

		const user = await User.create({
			username,
			email,
			password,
		});

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
		res.status(201).json({
			message: 'User registered successfully',
			token,
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) return res.status(404).json({ message: 'User not found' });

		console.log({
			password,
			check: user.password,
			test: await bcrypt.compare(password, user.password),
		});

		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) return res.status(401).json({ message: 'Invalid password' });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		res.json({
			message: 'Login successful',
			token,
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { register, login };
