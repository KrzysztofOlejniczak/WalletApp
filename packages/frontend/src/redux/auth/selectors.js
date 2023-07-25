
export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectUser = state => state.auth.name;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectError = state => state.auth.error;
