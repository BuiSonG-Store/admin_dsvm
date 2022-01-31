import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi } from '../../api/login';

const initialState = {
    pending: false,
    success: false,
    isLogin: false,
    isLogout: false,
    failed: false,
    message: '',
    data: {},
};
export const userLogin = createAsyncThunk('login', async (params) => {
    const res = await loginApi.login(params);
    return res.data;
});

const loginAndLogout = createSlice({
    name: 'login',
    initialState,
    reducers:{
        logout:(state)=>{
            state.data={};
            state.isLogin=false;
            state.isLogout=true;
        }
    },
    extraReducers: {
        [userLogin.pending]: (state) => {
            state.pending = true;
            state.success= false;
            state.failed=false;
        },
        [userLogin.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
            state.isLogin=true;
            state.isLogout=false;
        },
        [userLogin.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        },
    },
});

export default loginAndLogout.reducer;
export const {logout}=loginAndLogout.actions;