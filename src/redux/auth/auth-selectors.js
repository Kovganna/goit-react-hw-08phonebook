export const getIsLoggedIn = state => state.auth.isLoggedIn;

export const getUserName = state => state.auth.user.name;

export const getIsFetchCurrentUser = state => state.auth.isFetchCurrentUser;

export const errorRejected = state => state.auth.error;
