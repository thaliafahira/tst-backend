const Selection = require('../models/selection');

const selectionController = {
	getSelections: async (req, res) => {
		try {
			const userId = req.user.id;
			const selections = await Selection.find({ userId });
			res.json(selections);
		} catch (error) {
			console.error('Error getting selections:', error);
			res.status(500).json({ message: 'Error retrieving selections' });
		}
	},

	saveSelections: async (req, res) => {
		try {
			const userId = req.user.id;
			const selections = req.body;

			await Selection.deleteMany({ userId });

			const newSelections = await Selection.create({
				userId,
				items: selections,
			});

			res.json(newSelections);
		} catch (error) {
			console.error('Error saving selections:', error);
			res.status(500).json({ message: 'Error saving selections' });
		}
	},
};

module.exports = selectionController;
