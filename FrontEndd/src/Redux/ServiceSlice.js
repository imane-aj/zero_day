import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { getCookie } from './Utils';

export const services = createAsyncThunk('service/services',async(url) => {
    try {
        const res = await axios.get(url);
        return res.data.data;
    } catch (er) {
        throw er;
    }  
});
//addNewPost
export const storeService = createAsyncThunk('service/storeService',async(formData, {dispatch, rejectWithValue }) => {
    try {
        const token = getCookie('token')
        console.log(formData)
        const res = await axios.post('new_service',formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        });
        dispatch(services())
        return res.data
    } catch (er) {
        return rejectWithValue(er.response.data);
    }  
});

export const deleteService = createAsyncThunk('service/deleteService', async(id, {dispatch})=>{
    try{
        const token = getCookie('token')
        await axios.delete(`service/${id}`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            }})
        dispatch(services())
        return id;
    }catch(er){
        throw er;
    }
})

export const handleSearch = createAsyncThunk('service/handleSearch', async(query)=>{
    try{
        const token = getCookie('token')
        const res = await axios.post('search_service', { query }, {
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
export const updateService = createAsyncThunk("service/updateService",async ({id, formData}, { rejectWithValue ,dispatch}) => {
    try {
        const token = getCookie('token')
      const response = await axios.post(`service/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      dispatch(services());
      return response.data;
    } catch  (er) {
        return rejectWithValue(er.response.data)
    }
  }
);

//getById
export const ShowService = createAsyncThunk('service/ShowService', async(id)=>{
    try{
        const res = await axios.get(`services/service/${id}`)
        return res.data;
    }catch(er){
        throw er;
    }
})
  
const Service = createSlice({
    name : 'service',
    initialState : {data : [], isLoading: false, error: '', search:[], service:[]},
    extraReducers: (builder) => {
        builder.addCase(services.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(services.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(services.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data= action.payload
            state.error = ""
        }),
        //add post
        builder.addCase(storeService.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(storeService.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(storeService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = ""
        }),
         //delet
         builder.addCase(deleteService.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(deleteService.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(deleteService.fulfilled, (state, action) => {
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
         builder.addCase(updateService.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(updateService.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(updateService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = ""
        })
         //showPost
         builder.addCase(ShowService.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(ShowService.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(ShowService.fulfilled, (state, action) => {
            state.isLoading = false;
            state.service = action.payload;
            state.error = ""
        })
    }
})

export default Service.reducer;