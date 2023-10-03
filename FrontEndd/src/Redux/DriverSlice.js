import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie, url } from './Utils';
import axios from './Utils';

//service 
export const Drivers = createAsyncThunk('driver/Drivers',async(url) => {
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

export const DriversT = createAsyncThunk('driver/DriversT',async(url) => {
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

export const DriversR = createAsyncThunk('driver/DriversR',async(url) => {
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


export const updateDriver = createAsyncThunk('driver/updateDriver', async ({ id, status, cpage }, {dispatch}) => {
      try {
        const token = getCookie('token');
        await axios.post(`${url}driver/update/${id}`,{status}, {headers:{
            'Authorization': `Bearer ${token}`,
        }});
        dispatch(Drivers(`${url}drivers_demande?page=${cpage}`))
      } catch (er) {
        throw er;
      }
    }
  );

  export const storeDriver = createAsyncThunk('driver/storeDriver', async (formData , {dispatch}) => {
    try {

      await axios.post(`${url}store_driver`,formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            // 'Authorization': `Bearer ${token}`,
        },
    });

} catch (er) {
      throw er;
    }
  }
);
  
export const storeCommit = createAsyncThunk('driver/storeCommit', async ({id,formData} , {dispatch}) => {
    try {
        const token = getCookie('token');
      await axios.post(`driver/commit/${id}`,formData, {headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        },
    });

} catch (er) {
      throw er;
    }
  }
);

export const Search_driver = createAsyncThunk('driver/Search_driver', async(query)=>{
    try{
        const token = getCookie('token');
        const res = await axios.post(`${url}searchDriver_admin`, { query }, {headers:{
            'Authorization': `Bearer ${token}`,
            }});
        return res.data
        // dispatch(BOwner({ url: null, data })); // Pass 'url' as null to indicate that it's not a paginated request
    } catch(er){
        throw er;
    }
})

const Driver = createSlice({
    name : 'driver',
    initialState : {data : [], isLoading: false,isLoadingStatus: false, error: '', search:[], dataT:[], dataR:[]},
    extraReducers: (builder) => {
        builder.addCase(Drivers.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(Drivers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(Drivers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data= action.payload;
            state.error = "";
        })
        builder.addCase(DriversT.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(DriversT.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(DriversT.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dataT= action.payload;
            state.error = "";
        })
         // // store
         builder.addCase(storeDriver.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(storeDriver.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(storeDriver.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dataT= action.payload;
            state.error = "";
        })
        builder.addCase(storeCommit.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(storeCommit.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(storeCommit.fulfilled, (state, action) => {
            state.isLoading = false;
            // state.dataT= action.payload;
            state.error = "";
        })
        // //update
        builder.addCase(updateDriver.pending, (state) => {
            state.isLoadingStatus = true;
        }),
        builder.addCase(updateDriver.rejected, (state, action) => {
            state.isLoadingStatus = false;
            state.error = action.payload;
        }),
        builder.addCase(updateDriver.fulfilled, (state, action) => {
            state.isLoadingStatus = false
            // state.data = state.data.map((val) => (val.id === id ? { ...val, status } : val));
        })
        // //search 
        builder.addCase(Search_driver.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(Search_driver.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(Search_driver.fulfilled, (state, action) => {
            state.isLoading = false;
            state.search= action.payload
             console.log('form redu', state.data.data)
            state.error = ""
        })
        builder.addCase(DriversR.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(DriversR.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(DriversR.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dataR= action.payload;
            state.error = "";
        })
    }
})

export default Driver.reducer;