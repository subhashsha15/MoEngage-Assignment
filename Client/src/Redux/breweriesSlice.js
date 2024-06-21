import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://mo-engage-api.vercel.app/api/';

// export const fetchBreweriesByCity = createAsyncThunk('breweries/fetchByCity', async (city) => {
//   const response = await axios.get(`${BASE_URL}breweries/search/by_city?city=${city}`);
//   console.log("fetch by city data", response);
//   return response.data;
// });


// export const fetchBreweriesByCity = createAsyncThunk('breweries/fetchByCity', async (city, { getState }) => {
//   const token = getState().user.token;
//   const response = await axios.get(`${BASE_URL}breweries/search/by_city?city=${city}`);
//   const breweries = response.data;

//   const breweriesWithRatings = await Promise.all(
//     breweries.map(async (brewery) => {
//       const reviewsResponse = await axios.get(`${BASE_URL}reviews/${brewery.id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const reviews = reviewsResponse.data;
//       const averageRating = reviews.reduce((acc, review) => acc + Number(review.rating), 0) / reviews.length || null;
//       return { ...brewery, averageRating };
//     })
//   );

//   return breweriesWithRatings;
// });
// // ********************************************************************

// export const fetchBreweriesByName = createAsyncThunk('breweries/fetchByName', async (name) => {
//   const response = await axios.get(`${BASE_URL}breweries/search/by_name?name=${name}`);
//   return response.data;
// });

// export const fetchBreweriesByType = createAsyncThunk('breweries/fetchByType', async (type) => {
//   const response = await axios.get(`${BASE_URL}breweries/search/by_type?type=${type}`);
//   return response.data;
// });

const fetchBreweriesAndCalculateRatings = async (url, token) => {
  const response = await axios.get(url);
  const breweries = response.data;

  const breweriesWithRatings = await Promise.all(
    breweries.map(async (brewery) => {
      const reviewsResponse = await axios.get(`${BASE_URL}reviews/${brewery.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const reviews = reviewsResponse.data;
      const averageRating = reviews.reduce((acc, review) => acc + Number(review.rating), 0) / reviews.length || null;
      return { ...brewery, averageRating };
    })
  );

  return breweriesWithRatings;
};

export const fetchBreweriesByCity = createAsyncThunk('breweries/fetchByCity', async (city, { getState }) => {
  const token = getState().user.token;
  return fetchBreweriesAndCalculateRatings(`${BASE_URL}breweries/search/by_city?city=${city}`, token);
});

export const fetchBreweriesByName = createAsyncThunk('breweries/fetchByName', async (name, { getState }) => {
  const token = getState().user.token;
  return fetchBreweriesAndCalculateRatings(`${BASE_URL}breweries/search/by_name?name=${name}`, token);
});

export const fetchBreweriesByType = createAsyncThunk('breweries/fetchByType', async (type, { getState }) => {
  const token = getState().user.token;
  return fetchBreweriesAndCalculateRatings(`${BASE_URL}breweries/search/by_type?type=${type}`, token);
});

export const fetchBreweryById = createAsyncThunk('breweries/fetchBreweryById', async (id, { getState }) => {
  const token = getState().user.token;
  const response = await axios.get(`${BASE_URL}breweries/${id}`);
  const reviewsResponse = await axios.get(`${BASE_URL}reviews/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const reviews = reviewsResponse.data;
  const averageRating = reviews.reduce((acc, review) => acc + Number(review.rating), 0) / reviews.length || null;
  return { ...response.data, averageRating, reviews };
});
const breweriesSlice = createSlice({
  name: 'breweries',
  initialState: {
    breweries: [],
    brewery: null,
    loading: false,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreweriesByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBreweriesByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.breweries = action.payload;
      })
      .addCase(fetchBreweriesByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBreweriesByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBreweriesByName.fulfilled, (state, action) => {
        state.loading = false;
        state.breweries = action.payload;
      })
      .addCase(fetchBreweriesByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBreweriesByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBreweriesByType.fulfilled, (state, action) => {
        state.loading = false;
        state.breweries = action.payload;
      })
      .addCase(fetchBreweriesByType.rejected, (state, action) => {
        state.loading = false;
        state.error = "Invalid Input";
      })
      .addCase(fetchBreweryById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.brewery = null;
      })
      .addCase(fetchBreweryById.fulfilled, (state, action) => {
        state.loading = false;
        state.brewery = action.payload;
      })
      .addCase(fetchBreweryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default breweriesSlice.reducer;
