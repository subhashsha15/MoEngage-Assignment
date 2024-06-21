import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBreweryById } from '../../Redux/breweriesSlice';
import { fetchReviews, addReview } from '../../Redux/reviewsSlice';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

const Brewery = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { brewery, error: breweryError } = useSelector((state) => state.breweries);
  const user = useSelector((state) => state.user); // Access auth state
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch(fetchBreweryById(id));
    dispatch(fetchReviews(id));
  }, [dispatch, id]);

  const handleReviewSubmit = async () => {
    if (user.token) {
      await dispatch(addReview({ breweryId: id, rating, description }));
      await dispatch(fetchBreweryById(id));
      setRating(0);
      setDescription('');
    } else {
      // Handle unauthenticated state
      alert('Please login to add a review');
      navigate('/login');
    }
  };

  if (breweryError) return <p style={{ margin: "90px", textAlign: "center" }}>{breweryError}</p>;
  if (!brewery) return <p style={{ margin: "90px", textAlign: "center" }}>Loading...</p>;

  const latestReviewRating = brewery?.reviews.length - 1;
  const latestReview = brewery?.reviews[latestReviewRating];
  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3" component="div" sx={{ textAlign: "center" }}>
            {brewery.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {brewery.street}, {brewery.city}, {brewery.state}
          </Typography>
          <Typography variant="body2">
            Ph.No: {brewery.phone}
          </Typography>
          <Typography variant="body2">
            <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a>
          </Typography>
          <Typography sx={{ mt: 2 }} color="text.secondary">
            Current Rating: {latestReview?.rating > 0 ? latestReview.rating.toFixed(1) : 'No rating available'}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Type: {brewery.brewery_type}
          </Typography>
          <Typography variant="body2" gutterBottom >
            Address 1: {brewery.address_1}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Address 2:
            <span style={{ fontWeight: 'bold', color: brewery.address_2 ? 'green' : 'red' }}>
              {brewery.address_2 || "Not Available"}
            </span>
          </Typography>
          <Typography variant="body2" gutterBottom >
            Address 3:
            <span style={{ fontWeight: 'bold', color: brewery.address_3 ? 'green' : 'red' }}>
              {brewery.address_3 || "Not Available"}
            </span>
          </Typography>
          <Typography variant="body2" gutterBottom>
            State Province: {brewery.state_province}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Postal Code: {brewery.postal_code}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Country: {brewery.country}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Longitude: {brewery.longitude}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Latitude: {brewery.latitude}
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" component="div">
          Reviews
        </Typography>
        {brewery.reviews.map((review, index) => (
          <Card key={index} variant="outlined" sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="body2">
                <strong>{review.user.username}</strong>: {review.description}
              </Typography>
              <Rating value={review.rating} readOnly />
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" component="div">
          Add a Review
        </Typography>
        <Rating
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Review"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button variant="contained" onClick={handleReviewSubmit} sx={{ mt: 2 }}>
          Submit Review
        </Button>
      </Box>
    </Box>
  );
};

export default Brewery;
