import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {registerApi} from '../../api/register';

const initialState = {
    pending: false,
    success: false,
    failed: false,
    message: '',
    data: {},
};
export const userRegister = createAsyncThunk('register', async (params) => {
    const res = await registerApi.register(params);

    return res.data;
});

const register = createSlice({
    name: 'register',
    initialState,
    extraReducers: {
        [userRegister.pending]: (state) => {
            state.pending = true;
            state.success = false;
            state.failed = false;
        },
        [userRegister.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
        },
        [userRegister.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        },
    },
});

export default register.reducer;
