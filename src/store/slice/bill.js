import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {billApi}  from '../../api/bill';

const initialState = {
    pending: false,
    success: false,
    failed: false,
    message: '',
    data: [],
    postData:[]
};


export const getBills= createAsyncThunk('bill', async () => {
    const res = await billApi.getData();
    return res.data.$values;
});

// export const editProduct = createAsyncThunk('Edit Product', async (params) => {
//     const res = await productApi.editProduct(params,{headers});
//     return res.data;
// });


const bills = createSlice({
    name: 'bill',
    initialState,
    extraReducers: {
        [getBills.pending]: (state) => {
            state.pending = true;
            state.success = false;
            state.failed = false;
        },
        [getBills.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
        },
        [getBills.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        }
    },
});

export default bills.reducer;
