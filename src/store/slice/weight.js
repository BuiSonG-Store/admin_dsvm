import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {weightApi} from '../../api/weight';

const initialState = {
    pending: false,
    success: false,
    failed: false,
    message: '',
    data: [],
};

export const getWeight= createAsyncThunk('Get Weight', async () => {
    const res = await weightApi.getWeight();
    return res.data.$values;
});


const weights = createSlice({
    name: 'weight',
    initialState,
    extraReducers: {
        [getWeight.pending]: (state) => {
            state.pending = true;
            state.success = false;
            state.failed = false;
        },
        [getWeight.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
        },
        [getWeight.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        },
    },
});

export default weights.reducer;
