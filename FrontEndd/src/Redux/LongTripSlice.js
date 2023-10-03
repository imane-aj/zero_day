import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { getCookie } from './Utils';

export const LongTrips = createAsyncThunk('trip/LongTrips',async(url) => {
    try {
        const res = await axios.get(url);
        return res.data.data;
    }catch (er) {
        throw er;
    }  
});

//addNewPost
export const storeTrip = createAsyncThunk('trip/storeTrip',async(formData, {dispatch, rejectWithValue }) => {
    try {
        const token = getCookie('token')
        console.log(formData)
        const res = await axios.post('new_trip',formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        });
        dispatch(LongTrips())
        return res.data
    } catch (er) {
        return rejectWithValue(er.response.data);
    }  
});

export const deleteTrip = createAsyncThunk('trip/deleteTrip', async(id, {dispatch})=>{
    try{
        const token = getCookie('token')
        await axios.delete(`trip/${id}`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            }})
        dispatch(LongTrips())
        return id;
    }catch(er){
        throw er;
    }
})

export const handleSearch = createAsyncThunk('trip/handleSearch', async(query)=>{
    try{
        const token = getCookie('token')
        const res = await axios.post('search_trip', { query }, {
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
export const updateTrip = createAsyncThunk("trip/updateTrip",async ({id, formData}, { rejectWithValue ,dispatch}) => {
    try {
        const token = getCookie('token')
      const response = await axios.post(`trip/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      dispatch(LongTrips());
      return response.data;
    } catch  (er) {
        return rejectWithValue(er.response.data)
    }
  }
);

//getById
export const ShowTrip = createAsyncThunk('trip/ShowTrip', async(id)=>{
    try{
        const res = await axios.get(`trips/trip/${id}`)
        return res.data;
    }catch(er){
        throw er;
    }
})
  
const LongTrip = createSlice({
    name : 'trip',
    initialState : {data : [], isLoading: false, error: '', search:[], trip:[]},
    extraReducers: (builder) => {
        builder.addCase(LongTrips.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(LongTrips.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(LongTrips.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data= action.payload
            state.error = ""
        }),
        //add post
        builder.addCase(storeTrip.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(storeTrip.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(storeTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = ""
        }),
         //delet
         builder.addCase(deleteTrip.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(deleteTrip.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(deleteTrip.fulfilled, (state, action) => {
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
         builder.addCase(updateTrip.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(updateTrip.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(updateTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = ""
        })
         //showPost
         builder.addCase(ShowTrip.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(ShowTrip.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(ShowTrip.fulfilled, (state, action) => {
            state.isLoading = false;
            state.trip = action.payload;
            state.error = ""
        })
    }
})

export default LongTrip.reducer;