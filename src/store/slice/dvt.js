import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {dvtApi} from '../../api/dvt';

const initialState = {
    pending: false,
    success: false,
    failed: false,
    message: '',
    data: [],
};

export const getDvt= createAsyncThunk('Get Dvt', async () => {
    const res = await dvtApi.getDvt();
    return res.data.$values;
});


const dvts = createSlice({
    name: 'dvt',
    initialState,
    extraReducers: {
        [getDvt.pending]: (state) => {
            state.pending = true;
            state.success = false;
            state.failed = false;
        },
        [getDvt.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
        },
        [getDvt.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        },
    },
});

export default dvts.reducer;
