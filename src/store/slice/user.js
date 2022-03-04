import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {userApi} from '../../api/user';
import addAxiosHeader from '../../utils/addAxiosHeader';

const initialState = {
    pending: false,
    success: false,
    failed: false,
    message: '',
    data: [],
};
const headers=addAxiosHeader();

export const getUsers = createAsyncThunk('Get Users', async () => {
    const res = await userApi.getUser({headers});
    return res.data.$values;
});

export const editUser = createAsyncThunk('Edit User', async (params) => {
    const res = await userApi.editUser(params);
    return res.data;
});

export const getUserById = createAsyncThunk('Get User By Id', async (params) => {
    const res = await userApi.getUserById(params);
    return res.data;
});

export const deleteUser = createAsyncThunk('Delete User', async (params) => {
    const res = await userApi.deleteUser(params,{headers});
    return res.data;
});

const products = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.pending = true;
            state.success = false;
            state.failed = false;
        },
        [getUsers.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
        },
        [getUsers.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        },
    },
});

export default products.reducer;
