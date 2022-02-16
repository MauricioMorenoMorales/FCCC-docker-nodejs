const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

module.exports.signUp = async (req, res) => {
	const { username, password } = req.body;
	const hashPassword = await bcrypt.hash(password, 12);
	try {
		const newUser = await User.create({ username, password: hashPassword });
		res.status(201).json({
			status: 'success',
			data: {
				user: newUser,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
		});
	}
};
