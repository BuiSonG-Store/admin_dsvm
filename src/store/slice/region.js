import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {regionApi} from '../../api/region';
import addAxiosHeader from '../../utils/addAxiosHeader';

const initialState = {
    pending: false,
    success: false,
    failed: false,
    message: '',
    data: []
};
const headers=addAxiosHeader();

export const getRegions = createAsyncThunk('get list region', async () => {
    const res = await regionApi.getData();
    return res.data;
});

export const getRegionById = createAsyncThunk('Get Region By Id', async (params) => {
    const res = await regionApi.getRegionById(params);
    return res.data;
});
export const createRegion = createAsyncThunk('Create Region', async (params) => {
    const res = await regionApi.createRegion(params,{headers});

    return res.data;
});

export const deleteRegion = createAsyncThunk('Delete Region', async (params) => {
    const res = await regionApi.deleteRegion(params,{headers});
    return res.data;
});



const region = createSlice({
    name: 'province',
    initialState,
    extraReducers: {
        [getRegions.pending]: (state) => {
            state.pending = true;
            state.success = false;
            state.failed = false;
        },
        [getRegions.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
        },
        [getRegions.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        },
        [getRegionById.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
        },
        [getRegionById.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        }
    }
});
export default region.reducer;
