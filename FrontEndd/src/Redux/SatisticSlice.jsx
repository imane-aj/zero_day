import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { getCookie } from './Utils';

const token = getCookie('token');
export const Static = createAsyncThunk('Statistic/Statistics',async() => {
    try {
        const token = getCookie('token');
        const res = await axios.get('statistics', {headers:{
            'Authorization': `Bearer ${token}`,
        }});
        return res.data.data;
    } catch (er) {
        throw er;
    }  
});


const Statistic = createSlice({
    name : 'Statistic',
    initialState : {data : [], isLoading: false, error: '', search:[]},
    extraReducers: (builder) => {
        builder.addCase(Static.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(Static.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(Static.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data= action.payload
            console.log(state.data)
            state.error = ""
        })
    }
})

export default Statistic.reducer;