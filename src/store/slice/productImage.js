import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productApi } from '../../api/product';
import addAxiosHeader from '../../utils/addAxiosHeader';

const initialState = {
    pending: false,
    success: false,
    failed: false,
    message: '',
    data: [],
};

const headers=addAxiosHeader();


export const postProductImage= createAsyncThunk('Post Product Image',async (params)=>{
    const res = await productApi.postImage(params,{headers});
    return res.data;
});
const products = createSlice({
    name: 'product image',
    initialState,
    extraReducers: {
        [postProductImage.pending]: (state) => {
            state.pending = true;
            state.success= false;
            state.failed=false;
        },
        [postProductImage.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
        },
        [postProductImage.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        },
    },
});

export default products.reducer;
