import axios from 'axios';
import api from '../api/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stagger } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';

//signUp
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/register', userData);
      return response.data;
    } catch (error) {
      console.log('Error occured while signUp', error);

      return rejectWithValue(
        error.response?.data?.message || 'something is Wrong',
      );
    }
  },
);

//logIn
export const logInUser = createAsyncThunk(
  'auth/logInUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/login', { email, password });
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('user', response.data.user);
      }
      return response.data;
    } catch (error) {
      console.log('Error occurred while LogIn', error);

      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  },
);

//logOut
export const logOutUser = createAsyncThunk('auth/logOutUser', async () => {
  try {
    const token = await AsyncStorage.removeItem('token');
    console.log('token Removed', token);
  } catch (error) {
    console.log(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      //signUp
      .addCase(signUpUser.pending, state => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, state => {
        state.loading = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })

      //LogIn
      .addCase(logInUser.pending, state => {
        state.loading = true;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //logout
      .addCase(logOutUser.fulfilled, () => {
        (state.user = null), (state.token = null);
      });
  },
});

export default authSlice.reducer;
