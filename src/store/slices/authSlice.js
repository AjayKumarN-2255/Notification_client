import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
const initialState = {
    user: savedUser,
    loading: false,
    error: null,
    accessToken: null,
    isAuthenticated: false,
    sessionChecked: false
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.isAuthenticated = !!accessToken;
            state.sessionChecked = !!accessToken;
            state.loading = false;
            state.error = null;
            localStorage.setItem("user", JSON.stringify(user));
        },
        setUser: (state, action) => {
            const user = action.payload;
            state.user = user;
            localStorage.setItem("user", JSON.stringify(user));
        },
        setToken: (state, action) => {
            state.accessToken = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.sessionChecked = false;
            state.error = null;
            localStorage.removeItem("user");
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setSessionChecked: (state, action) => {
            state.sessionChecked = action.payload;
        }
    }
})

export const { setCredentials, setToken, logout, setLoading, setUser, setError, setSessionChecked } = authSlice.actions;
export default authSlice.reducer;