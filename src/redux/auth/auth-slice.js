import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, fetchCurrentUser } from './auth-operations';
import {
  loginSuccess,
  loginError,
  registerSuccess,
  registerError,
} from './auth-actions';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isFetchCurrentUser: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.pending](state, _) {
      state.error = null;
      state.token = null;
    },
    [register.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    [register.rejected](state, { payload }) {
      state.error = payload;
      state.token = null;
      state.isLoggedIn = false;
    },

    [logIn.pending](state, _) {
      state.error = null;
      state.token = null;
    },
    [logIn.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    [logIn.rejected](state, { payload }) {
      state.error = payload;
      state.token = null;
      state.isLoggedIn = false;
    },

    [logOut.pending](state, _) {
      state.error = null;
    },
    [logOut.fulfilled](state, _) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [logOut.fulfilled](state, { payload }) {
      state.error = payload;
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
