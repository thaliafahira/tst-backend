const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	price: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Food', foodSchema);
