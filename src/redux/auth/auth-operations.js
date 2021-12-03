import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginRequest,
  loginSuccess,
  loginError,
  registerRequest,
  registerSuccess,
  registerError,
} from './auth-actions';
import { toast } from 'react-toastify';

export const BASE_URL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

// export const register = createAsyncThunk(
//   'auth/register',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post(
//         `${BASE_URL}/users/signup`,
//         credentials,
//       );
//       token.set(data.token);
//       return data;
//     } catch (error) {
//       rejectWithValue(error);
//     }
//   },
// );

export const register = userData => dispatch => {
  dispatch(loginRequest());
  axios
    .post(`${BASE_URL}/users/signup`, userData)
    .then(response => {
      token.set(response.data.token);
      dispatch(registerSuccess(response.data));
    })
    .catch(error => {
      dispatch(registerError(error.message));
      toast.info(error.message);
    });
};

// export const logIn = createAsyncThunk(
//   'auth/login',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post(`${BASE_URL}/users/login`, credentials);
//       token.set(data.token);
//       return data;
//     } catch (error) {
//       rejectWithValue(error);
//     }
//   },
// );

export const logIn = userData => dispatch => {
  dispatch(loginRequest());
  axios
    .post(`${BASE_URL}/users/login`, userData)
    .then(response => {
      token.set(response.data.token);
      dispatch(loginSuccess(response.data));
    })
    .catch(error => {
      dispatch(loginError(error.message));
      toast.info(error.message);
    });
};

export const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/users/logout`);
      token.unset();
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      console.log('No token');
      return thunkAPI.rejectWithValue();
    }
    token.set(persistedToken);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  },
);
