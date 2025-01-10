const Food = require('../models/food');

const getAllFoods = async (req, res) => {
	try {
		const foods = await Food.find();
		res.json(foods);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getFoodById = async (req, res) => {
	try {
		const food = await Food.findById(req.params.id);
		if (!food) {
			return res.status(404).json({ message: 'Food item not found' });
		}
		res.json(food);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getFoodByCategory = async (req, res) => {
	try {
		const foods = await Food.find({ category: req.params.category });
		res.json(foods);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createFood = async (req, res) => {
	try {
		const { name, description, price, category } = req.body;

		if (!name || !price || !category) {
			return res.status(400).json({ message: 'Name, price, and category are required' });
		}

		const food = await Food.create({
			name,
			description,
			price,
			category,
		});

		res.status(201).json({
			message: 'Food item created successfully',
			food,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateFood = async (req, res) => {
	try {
		const { name, description, price, category } = req.body;
		const food = await Food.findByIdAndUpdate(
			req.params.id,
			{
				name,
				description,
				price,
				category,
			},
			{ new: true }
		);

		if (!food) {
			return res.status(404).json({ message: 'Food item not found' });
		}

		res.json({
			message: 'Food item updated successfully',
			food,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteFood = async (req, res) => {
	try {
		const food = await Food.findByIdAndDelete(req.params.id);

		if (!food) {
			return res.status(404).json({ message: 'Food item not found' });
		}

		res.json({ message: 'Food item deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllFoods,
	getFoodById,
	getFoodByCategory,
	createFood,
	updateFood,
	deleteFood,
};
