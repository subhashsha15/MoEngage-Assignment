// Redux/reviewsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://mo-engage-api.vercel.app/api/';


export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async (breweryId, { getState }) => {
  const { auth: { token } } = getState();
  const response = await axios.get(`${BASE_URL}reviews/${breweryId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
});

export const addReview = createAsyncThunk('reviews/addReview', async ({ breweryId, rating, description }, { getState }) => {
  const state = getState();
  const token = state.user.token; 
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(`${BASE_URL}reviews/${breweryId}`, { rating, description }, config);
  return response.data;
});

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  },
});

export default reviewsSlice.reducer;
