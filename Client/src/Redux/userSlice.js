import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/auth';
export const login = createAsyncThunk('user/login', async (userData) => {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    return response.data;
});

export const signup = createAsyncThunk('user/signup', async (userData) => {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    return response.data;
});

export const logoutUser = createAsyncThunk('auth/logout', async (token) => {
    const response = await axios.post(`${BASE_URL}/logout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to logout');
    }
    return response.json();
});
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        token: localStorage.getItem('token') || null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(signup.rejected, (state, action) => {
                state.error = action.error.message;
            })
    }, 
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;