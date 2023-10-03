import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { getCookie } from './Utils';

export const transfers = createAsyncThunk('transfer/transfers',async(url) => {
    try {
        const res = await axios.get(url);
        return res.data.data;
    } catch (er) {
        throw er;
    }  
});
//addNewPost
export const storeTransfer = createAsyncThunk('transfer/storeTransfer',async(formData, {dispatch, rejectWithValue }) => {
    try {
        const token = getCookie('token')
        console.log(formData)
        const res = await axios.post('new_transfer',formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        });
        dispatch(transfers())
        return res.data
    } catch (er) {
        return rejectWithValue(er.response.data);
    }  
});

export const deletetransfer = createAsyncThunk('transfer/deletetransfer', async(id, {dispatch})=>{
    try{
        const token = getCookie('token')
        await axios.delete(`transfer/${id}`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            }})
        dispatch(transfers())
        return id;
    }catch(er){
        throw er;
    }
})

export const handleSearch = createAsyncThunk('transfer/handleSearch', async(query)=>{
    try{
        const token = getCookie('token')
        const res = await axios.post('search_transfer', { query }, {
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            }},)
        return res.data
        // dispatch(BOwner({ url: null, data })); // Pass 'url' as null to indicate that it's not a paginated request
    } catch(er){
        throw er;
    }
})

//update
export const updatetransfer = createAsyncThunk("transfer/updatetransfer",async ({id, formData}, { rejectWithValue ,dispatch}) => {
    try {
        const token = getCookie('token')
        console.log(formData)
      const response = await axios.post(`transfer/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      dispatch(transfers());
      return response.data;
    } catch  (er) {
        return rejectWithValue(er.response.data)
    }
  }
);

//getById
export const Showtransfer = createAsyncThunk('transfer/Showtransfer', async(id)=>{
    try{
        const res = await axios.get(`transfers/transfer/${id}`)
        return res.data;
    }catch(er){
        throw er;
    }
})
  
const Transfer = createSlice({
    name : 'transfer',
    initialState : {data : [], isLoading: false, error: '', search:[], transfer:[]},
    extraReducers: (builder) => {
        builder.addCase(transfers.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(transfers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(transfers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data= action.payload
            state.error = ""
        }),
        //add post
        builder.addCase(storeTransfer.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(storeTransfer.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(storeTransfer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = ""
        }),
         //delet
         builder.addCase(deletetransfer.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(deletetransfer.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(deletetransfer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = ""
        }),
        //search
        builder.addCase(handleSearch.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(handleSearch.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(handleSearch.fulfilled, (state, action) => {
            state.isLoading = false;
            state.search= action.payload
            state.error = ""
        }),
         //updatePost
         builder.addCase(updatetransfer.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(updatetransfer.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(updatetransfer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = ""
        })
         //showPost
         builder.addCase(Showtransfer.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(Showtransfer.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(Showtransfer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.transfer = action.payload;
            state.error = ""
        })
    }
})

export default Transfer.reducer;