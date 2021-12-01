import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, fetchCurrentUser } from './auth-operations';
import {
  loginSuccess,
  loginError,
  registerSuccess,
  registerError,
} from './auth-actions';

const initialState = {
  user: { name: '', email: '' },
  token: '',
  isLoggedIn: false,
  isFetchCurrentUser: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    [logIn.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    [logOut.fulfilled](state, _) {
      state.user = { name: '', email: '' };
      state.token = '';
      state.isLoggedIn = false;
    },
    [fetchCurrentUser.pending](state) {
      state.isFetchCurrentUser = true;
    },
    [fetchCurrentUser.fulfilled](state, { payload }) {
      state.user = payload;
      state.isLoggedIn = true;
    },
    [fetchCurrentUser.rejected](state) {
      state.isFetchCurrentUser = false;
    },
    [loginSuccess](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    [loginError](state, { payload }) {
      state.error = payload.message;
    },
    [registerSuccess](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    [registerError](state, { payload }) {
      state.error = payload.message;
    },
  },
});

export default authSlice.reducer;
