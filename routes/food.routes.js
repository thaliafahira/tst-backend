const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const foodController = require('../controllers/food.controller');

router.get('/', foodController.getAllFoods);
router.post('/', authenticateToken, foodController.createFood);
router.get('/category/:category', foodController.getFoodByCategory);

router.get('/:id', foodController.getFoodById);
router.put('/:id', authenticateToken, foodController.updateFood);
router.delete('/:id', authenticateToken, foodController.deleteFood);

// TODO: implements this routes
// router.get('/categories/list', foodController.getCategories);
// router.get('/search', foodController.searchFoods);
// router.post('/bulk', authenticateToken, foodController.createManyFoods);
// router.put('/bulk', authenticateToken, foodController.updateManyFoods);
// router.get('/filter/price-range', foodController.getFoodsByPriceRange);
// router.get('/filter/dietary', foodController.getFoodsByDietary);

module.exports = router;
