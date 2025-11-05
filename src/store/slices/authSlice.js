import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
const initialState = {
    user: savedUser,
    loading: true,
    error: null,
    accessToken: null,
    isAuthenticated: false
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
            state.loading = false;
            state.error = null;
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
            state.loading = false;
            state.error = null;
            localStorage.removeItem("user");
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const { setCredentials, setToken, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;