import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie, url } from './Utils';
import axios from './Utils';

//service 
export const Services = createAsyncThunk('Request/Services',async(url) => {
    try {
        const token = getCookie('token');
        const res = await axios.get(url, {headers:{
            'Authorization': `Bearer ${token}`,
            }});
        return res.data.data;
    } catch (er) {
        throw er;
    }  
});
export const createService = createAsyncThunk('Request/createService', async (formData, { dispatch, rejectWithValue }) => {
    try {
        console.log(formData)
        await axios.post(`${url}service_request_store`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'Authorization': `Bearer ${token}`,
            },
        });

    } catch (er) {
        return rejectWithValue(er.response.data);
    }
}
);

export const storePrice = createAsyncThunk('Request/storePrice', async({formData,id}, {dispatch, rejectWithValue })=>{
    try{
        console.log('from red', id)
        const token = getCookie('token');
        const res = await axios.post(`service/${id}/price`, formData, {headers:{
            'Authorization': `Bearer ${token}`,
            }});
        return res.data
    }catch(er){
        throw er;
    }
})

export const storePriceTrip = createAsyncThunk('Request/storePriceTrip', async({formData,id}, {dispatch, rejectWithValue })=>{
    try{
        console.log('from red', id)
        const token = getCookie('token');
        const res = await axios.post(`trip/${id}/price`, formData, {headers:{
            'Authorization': `Bearer ${token}`,
            }});
        return res.data
    }catch(er){
        throw er;
    }
})

export const updateService = createAsyncThunk('Request/updateService', async ({ id, status, cpage }, {dispatch}) => {
      try {
        const token = getCookie('token');
        await axios.post(`${url}service_request/${id}`,{status}, {headers:{
            'Authorization': `Bearer ${token}`,
            }});
        dispatch(Services(`${url}service_request?page=${cpage}`))
      } catch (er) {
        throw er;
      }
    }
  );

export const Display = createAsyncThunk('Request/Display', async (id , {dispatch}) => {
    try {
        const token = getCookie('token');
      const res = await axios.get(`${url}service_request/${id}/display`, {headers:{
        'Authorization': `Bearer ${token}`,
        }});
      return res.data
    } catch (er) {
      throw er;
    }
  }
);
  
export const Search_service = createAsyncThunk('Request/Search_service', async(query)=>{
    try{
        const token = getCookie('token');
        const res = await axios.post(`${url}service_request_search`, { query }, {headers:{
            'Authorization': `Bearer ${token}`,
            }});
        return res.data
        // dispatch(BOwner({ url: null, data })); // Pass 'url' as null to indicate that it's not a paginated request
    } catch(er){
        throw er;
    }
})

//LongTrip
export const LongTrip = createAsyncThunk('Request/LongTrip',async(url) => {
    try {
        const token = getCookie('token');
        const res = await axios.get(url, {headers:{
            'Authorization': `Bearer ${token}`,
            }});
        return res.data.data;
    } catch (er) {
        throw er;
    }  
});

export const createLongTrip = createAsyncThunk('Request/createLongTrip', async (formData, { dispatch, rejectWithValue }) => {
    try {
        console.log(formData)
        await axios.post(`${url}trip_request_store`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'Authorization': `Bearer ${token}`,
            },
        });

    } catch (er) {
        return rejectWithValue(er.response.data);
    }
}
);

export const updateLongTrip = createAsyncThunk('Request/updateLongTrip', async ({ id, status, cpage }, {dispatch}) => {
      try {
        const token = getCookie('token');
        await axios.post(`${url}trip_request/${id}`,{status}, {headers:{
            'Authorization': `Bearer ${token}`,
            }});
        dispatch(LongTrip(`${url}trip_request?page=${cpage}`))
      } catch (er) {
        throw er;
      }
    }
  );

export const DisplayTrip = createAsyncThunk('Request/DisplayTrip', async (id , {dispatch}) => {
    try {
        const token = getCookie('token');
      const res = await axios.get(`${url}trip_request/${id}/display`, {headers:{
        'Authorization': `Bearer ${token}`,
        }});
      return res.data
    } catch (er) {
      throw er;
    }
  }
);
  
export const Search_trip = createAsyncThunk('Request/Search_trip', async(query)=>{
    try{
        const token = getCookie('token');
        const res = await axios.post(`${url}trip_request_search`, { query }, {headers:{
            'Authorization': `Bearer ${token}`,
        }});
        return res.data
        // dispatch(BOwner({ url: null, data })); // Pass 'url' as null to indicate that it's not a paginated request
    } catch(er){
        throw er;
    }
})



const Request = createSlice({
    name : 'Request',
    initialState : {data : [], isLoading: false,isLoadingStatus: false, error: '', search:[], showService:[], showTrip:[]},
    extraReducers: (builder) => {
        builder.addCase(Services.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(Services.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(Services.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data= action.payload
            state.error = ""
        })
        // create
        builder.addCase(createService.pending, (state) => {
            state.isLoadingStatus = true;
        }),
        builder.addCase(createService.rejected, (state, action) => {
            state.isLoadingStatus = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(createService.fulfilled, (state, action) => {
            state.isLoadingStatus = false
            // state.data = state.data.map((val) => (val.id === id ? { ...val, status } : val));
        }),
        // //update
        builder.addCase(updateService.pending, (state) => {
            state.isLoadingStatus = true;
        }),
        builder.addCase(updateService.rejected, (state, action) => {
            state.isLoadingStatus = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(updateService.fulfilled, (state, action) => {
            state.isLoadingStatus = false
            // state.data = state.data.map((val) => (val.id === id ? { ...val, status } : val));
        })
        // //search 
        builder.addCase(Search_service.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(Search_service.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(Search_service.fulfilled, (state, action) => {
            state.isLoading = false;
            state.search= action.payload
             console.log('form redu', state.data.data)
            state.error = ""
        })
        //display
        builder.addCase(Display.pending, (state) => {
            state.isLoading = true;
            }),
        builder.addCase(Display.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(Display.fulfilled, (state, action) => {
        state.isLoading = false;
        state.showService = action.payload;
        state.error = ""
        })

        //trip

        builder.addCase(LongTrip.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(LongTrip.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(LongTrip.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data= action.payload
            state.error = ""
        })
        //
        builder.addCase(createLongTrip.pending, (state) => {
            state.isLoadingStatus = true;
        }),
            builder.addCase(createLongTrip.rejected, (state, action) => {
                state.isLoadingStatus = false;
                state.error = action.payload;
                console.log(state.error)
            }),
            builder.addCase(createLongTrip.fulfilled, (state, action) => {
                state.isLoadingStatus = false
                // state.data = state.data.map((val) => (val.id === id ? { ...val, status } : val));
            })
        // //update
        builder.addCase(updateLongTrip.pending, (state) => {
            state.isLoadingStatus = true;
        }),
        builder.addCase(updateLongTrip.rejected, (state, action) => {
            state.isLoadingStatus = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(updateLongTrip.fulfilled, (state, action) => {
            state.isLoadingStatus = false
            // state.data = state.data.map((val) => (val.id === id ? { ...val, status } : val));
        })
        // //search 
        builder.addCase(Search_trip.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(Search_trip.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(Search_trip.fulfilled, (state, action) => {
            state.isLoading = false;
            state.search= action.payload
             console.log('form redu', state.data.data)
            state.error = ""
        })
        //display
        builder.addCase(DisplayTrip.pending, (state) => {
            state.isLoading = true;
            }),
        builder.addCase(DisplayTrip.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(DisplayTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.showTrip = action.payload;
        state.error = ""
        }),
        //storePrice
        builder.addCase(storePrice.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(storePrice.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(storePrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = ""
        })
         //storePriceTrip
         builder.addCase(storePriceTrip.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(storePriceTrip.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(storePriceTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = ""
        })
    }
})

export default Request.reducer;