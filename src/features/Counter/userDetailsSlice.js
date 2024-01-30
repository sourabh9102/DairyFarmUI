import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    login: JSON.parse(localStorage.getItem('login_local')) || false,
    userDetail: JSON.parse(localStorage.getItem('userDetails_local')),
    reload: false,
    tempToken: JSON.parse(localStorage.getItem('tempToken_local')) || null
};

const userDetails = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.login = true;
            state.token = action.payload.token;
            state.tempToken = null;
            state.userDetail = { ...action.payload.userDetail }
            localStorage.setItem('login_local', true);
            localStorage.setItem('userDetails_local', JSON.stringify(state.userDetail));
            localStorage.setItem('token_local', JSON.stringify(state.token));
        },
        setLogout: (state) => {
            state.login = false;
            state.tempToken = null;
            state.userDetail = null;
            state.token = null;
            localStorage.removeItem('login_local');
            localStorage.removeItem('userDetails_local');
            localStorage.removeItem('token_local');
        },
        setTempToken: (state, action) => {
            state.tempToken = action.payload;
            localStorage.setItem('tempToken_local', JSON.stringify(state.tempToken));
        }
    },
});

export const { setLogin, setLogout, setTempToken } = userDetails.actions;

export const selectUserDetails = (state) => state.userDetails.userDetail;

export default userDetails.reducer;
