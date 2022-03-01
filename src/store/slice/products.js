import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {productApi} from '../../api/product';
import addAxiosHeader from '../../utils/addAxiosHeader';

const initialState = {
    pending: false,
    success: false,
    failed: false,
    message: '',
    data: [],
    postData:[]
};

const headers=addAxiosHeader();

export const getProduct = createAsyncThunk('product', async () => {
    const res = await productApi.getData();
    return res.data.$values;
});

export const postProduct = createAsyncThunk('Post Product', async (params) => {
    const res = await productApi.postData(params,{headers});
    return res.data;
});

export const editProduct = createAsyncThunk('Edit Product', async (params) => {
    const res = await productApi.editProduct(params,{headers});
    return res.data;
});

export const getProductById = createAsyncThunk('Get Product By Id', async (params) => {
    const res = await productApi.getProductById(params);
    return res.data;
});

export const deleteProduct = createAsyncThunk('Delete Product', async (params) => {
    const res = await productApi.deleteProduct(params,{headers});
    return res.data;
});

const products = createSlice({
    name: 'product',
    initialState,
    extraReducers: {
        [getProduct.pending]: (state) => {
            state.pending = true;
            state.success = false;
            state.failed = false;
        },
        [getProduct.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
        },
        [getProduct.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        },
        [postProduct.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.postData = action.payload;
        },
        [postProduct.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        },
        [editProduct.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
        },
        [editProduct.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
        },
        [deleteProduct.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        },
        [getProductById.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
        },
        [getProductById.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        },
    },
});

export default products.reducer;
