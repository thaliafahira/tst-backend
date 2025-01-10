const mongoose = require('mongoose');

const selectionSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	items: [
		{
			id: String,
			name: String,
			price: Number,
			category: String,
			description: String,
			dietary: [String],
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Selection', selectionSchema);
