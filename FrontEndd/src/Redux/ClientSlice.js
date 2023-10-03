import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { getCookie } from './Utils';


export const Clients = createAsyncThunk('client/Clients',async(url) => {
    try {
        const token = getCookie('token');
        const res = await axios.get(url, {headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            }});
        return res.data.data;
    } catch (er) {
        throw er;
    }
});

export const SearchClients = createAsyncThunk('client/SearchClients', async(query)=>{
    try{
        const token = getCookie('token');
        const res = await axios.post('search/client', { query },{
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            }},)
        return res.data
    } catch(er){
        throw er;
    }
})

export const deleteClient = createAsyncThunk('client/deleteClient', async(id, {dispatch})=>{
    try{
        const token = getCookie('token');
        await axios.delete(`client/${id}`,{
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            }},)
        dispatch(Clients())
        return id;
    }catch(er){
        throw er;
    }
})
  

const Client = createSlice({
    name : 'client',
    initialState : {data : [], isLoading: false, error: '', search:[], showCotation:[]},
    extraReducers: (builder) => {
        builder.addCase(Clients.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(Clients.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(Clients.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data= action.payload
            state.error = ""
        })
        //search 
        builder.addCase(SearchClients.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(SearchClients.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(SearchClients.fulfilled, (state, action) => {
            state.isLoading = false;
            state.search= action.payload
             console.log('form redu', state.data.data)
            state.error = ""
        }),
        //delet
        builder.addCase(deleteClient.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(deleteClient.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(deleteClient.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = state.data.filter((el) => el.id !== action.payload);
        state.error = ""
        })
    }
})

export default Client.reducer;