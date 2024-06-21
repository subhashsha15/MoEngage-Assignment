// const express = require('express');
const Review = require('../Models/Review.Model');


// Add a review for a brewery
const addReview = async (req, res) => {
    const { breweryId } = req.params;
    const { rating, description } = req.body;

    try {
        const newReview = new Review({
            breweryId,
            user: req.user.id,
            rating,
            description
        });

        await newReview.save();

        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get reviews for a brewery
const getReview = async (req, res) => {
    const { breweryId } = req.params;

    try {
        const reviews = await Review.find({ breweryId }).populate('user', 'username');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addReview,
    getReview,
}
