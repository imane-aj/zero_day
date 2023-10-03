import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie, url } from './Utils';
import axios from './Utils';


export const Reservations = createAsyncThunk('Reservation/Reservations',async(url) => {
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
export const store = createAsyncThunk('Reservation/store',  async (formData, { dispatch, rejectWithValue }) => {
    try {
   
      await axios.post('reservation', formData, {
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
export const calcul = createAsyncThunk('Reservation/calcul',  async (formData, { dispatch, rejectWithValue }) => {
    try {
    //   console.log(formData)
      const res = await axios.post('calcul_reservation', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            // 'Authorization': `Bearer ${token}`,
        },
      
    });
    return res.data
    } catch (er) {
        return rejectWithValue(er.response.data);
    }
  }
);
export const updateResr = createAsyncThunk('Reservation/updateResr', async ({ id, status, cpage }, {dispatch}) => {
      try {
        const token = getCookie('token');
        await axios.post(`${url}reservation/${id}/status`,{status}, {headers:{
            'Authorization': `Bearer ${token}`,
        }});
        dispatch(Reservations(`${url}reservations?page=${cpage}`))
      } catch (er) {
        throw er;
      }
    }
  );
  

export const Search_reserv = createAsyncThunk('reservation/Search_reserv', async(query)=>{
    try{
        const token = getCookie('token');
        const res = await axios.post(`${url}reservation/search`, { query },{headers:{
            'Authorization': `Bearer ${token}`,
        }});
        return res.data
        // dispatch(BOwner({ url: null, data })); // Pass 'url' as null to indicate that it's not a paginated request
    } catch(er){
        throw er;
    }
})

export const Deactive = createAsyncThunk('Reservation/Deactive', async ({id, cpage}, {dispatch}) => {
    try {
        const token = getCookie('token');
      await axios.post(`${url}reservation/${id}/deactivate`,null, {headers:{
        'Authorization': `Bearer ${token}`,
        }});
      dispatch(Reservations(`${url}reservations?page=${cpage}`))
    } catch (er) {
      throw er;
    }
  }
);

export const ShowReservation = createAsyncThunk('Reservation/ShowReservation', async(id)=>{
    try{
  
        const res = await axios.get(`show_reservation/${id}`);
        return res.data;
    }catch(er){
        throw er;
    }
})

export const GetUserReservations = createAsyncThunk('Reservation/GetUserReservations', async(email)=>{
    try{

        const res = await axios.get(`reservations/${email}`);
        console.log(res.data)
        return res.data;
    }catch(er){
        throw er;
    }
})  

const Reservation = createSlice({
    name : 'Reservation',
    initialState : {data : [], isLoading: false,isLoadingStatus: false, error: '', search:[],prix : [], reservation: []},
    extraReducers: (builder) => {
        builder.addCase(Reservations.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(Reservations.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(Reservations.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data= action.payload
            state.error = ""
        })
        //update
        builder.addCase(updateResr.pending, (state) => {
            state.isLoadingStatus = true;
        }),
        builder.addCase(updateResr.rejected, (state, action) => {
            state.isLoadingStatus = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(updateResr.fulfilled, (state, action) => {
            state.isLoadingStatus = false
            // state.data = state.data.map((val) => (val.id === id ? { ...val, status } : val));
        }),
        builder.addCase(calcul.pending, (state) => {
            state.isLoadingStatus = true;
        }),
        builder.addCase(calcul.rejected, (state, action) => {
            state.isLoadingStatus = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(calcul.fulfilled, (state, action) => {
            state.isLoadingStatus = false
            state.prix= action.payload
            
            // state.data = state.data.map((val) => (val.id === id ? { ...val, status } : val));
        })
        //search 
        builder.addCase(Search_reserv.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(Search_reserv.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(Search_reserv.fulfilled, (state, action) => {
            state.isLoading = false;
            state.search= action.payload
             console.log('form redu', state.data.data)
            state.error = ""
        }),
         //update deactive
         builder.addCase(Deactive.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(Deactive.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(Deactive.fulfilled, (state, action) => {
            state.isLoading = false
            // state.data = state.data.map((val) => (val.id === id ? { ...val, status } : val));
        })
        //display
        builder.addCase(ShowReservation.pending, (state) => {
            state.isLoading = true;
            }),
        builder.addCase(ShowReservation.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(ShowReservation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reservation = action.payload;
        state.error = ""
        })
    }
})

export default Reservation.reducer;