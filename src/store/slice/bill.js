import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {billApi}  from '../../api/bill';
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


export const getBills= createAsyncThunk('bill', async () => {
    const res = await billApi.getData();
    return res.data.$values;
});

export const editBill = createAsyncThunk('Edit Bill', async (params) => {
    const res = await billApi.editBill(params,{headers});
    return res.data;
});

export const getBillById = createAsyncThunk('Get Bill By Id', async (params) => {
    const res = await billApi.getBillById(params);
    return res.data;
});


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
        },

        [editBill.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
        },
        [editBill.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        },
        [getBillById.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
        },
        [getBillById.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        },
    },
});

export default bills.reducer;
