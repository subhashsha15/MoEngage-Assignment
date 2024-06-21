const express = require('express');
const breweryController = require('../Controllers/Brewery.Controller')

const router = express.Router();


router.get('/search/by_city', breweryController.brewerySearchByCity);
router.get('/search/by_name', breweryController.brewerySearchByName);
router.get('/search/by_type', breweryController.brewerySearchByType);
router.get('/:id', breweryController.brewerySearchById);

module.exports = router;
