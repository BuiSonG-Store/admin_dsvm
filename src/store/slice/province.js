import { provinceApi } from '../../api/province';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    pending: false,
    success: false,
    failed: false,
    message: '',
    data: []
};

export const getProvinces = createAsyncThunk('get list province', async (params) => {
    const res = await provinceApi.getProvinces(params);
    return res.data;
});

const provinces = createSlice({
    name: 'province',
    initialState,
    extraReducers: {
        [getProvinces.pending]: (state) => {
            state.pending = true;
            state.success = false;
            state.failed = false;
        },
        [getProvinces.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
        },
        [getProvinces.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        }
    }
});
export default provinces.reducer;
