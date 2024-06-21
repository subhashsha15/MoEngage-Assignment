const express = require('express');
const axios = require('axios');

const router = express.Router();
const BASE_URL = 'https://api.openbrewerydb.org/v1/breweries';

// Fetch breweries by city
const brewerySearchByCity = async (req, res) => {
    const { city } = req.query;
    try {
        const response = await axios.get(`${BASE_URL}?by_city=${city}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch breweries by name
const brewerySearchByName = async (req, res) => {
    const { name } = req.query;
    try {
        const response = await axios.get(`${BASE_URL}?by_name=${name}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch breweries by type
const brewerySearchByType = async (req, res) => {
    const { type } = req.query;
    try {
        const response = await axios.get(`${BASE_URL}?by_type=${type}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "invalid input" });
    }
};

// Fetch a single brewery by ID
const brewerySearchById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    brewerySearchByCity,
    brewerySearchByName,
    brewerySearchByType,
    brewerySearchById
}
