const express = require('express');
const reviewController = require('../Controllers/Review.Controller')
const router = express.Router();
const auth=require('../middlewares/auth');

router.post('/:breweryId',auth,reviewController.addReview);
router.get('/:breweryId', reviewController.getReview);

module.exports = router;