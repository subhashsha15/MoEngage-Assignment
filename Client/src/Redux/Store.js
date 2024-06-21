import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import breweriesSlice from './breweriesSlice';
import reviewsSlice from './reviewsSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        breweries: breweriesSlice,
        reviews: reviewsSlice,
    },
});

export default store;
