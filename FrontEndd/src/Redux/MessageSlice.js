import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { getCookie } from './Utils';
import { url } from './Utils';

export const Messages = createAsyncThunk('message/Messages',async(url) => {
    try {
        const token = getCookie('token')
        const res = await axios.get(url, {
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            }},);
        return res.data.data;
    } catch (er) {
        throw er;
    }  
});
export const MessagesClient = createAsyncThunk('message/MessagesClient',async(formData) => {
    try {
        const res = await axios.post(`${url}messages_client`,formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
               
            },
        });
 
        return res.data.data;
    } catch (er) {
        throw er;
    }  
});

export const StoreMessages = createAsyncThunk('message/StoreMessages',async(formData) => {
    try {
      
        await axios.post(`${url}store_message`,formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'Authorization': `Bearer ${token}`,
            },
        });
   
    } catch (er) {
        throw er;
    }  
});
export const deleteMsg = createAsyncThunk('message/deleteMsg', async(id, {dispatch})=>{
    try{
        const token = getCookie('token')
        await axios.delete(`message/${id}`,{headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            }},)
        dispatch(Messages())
        return id;
    }catch(er){
        throw er;
    }
})

export const Display = createAsyncThunk('message/Display', async (id , {dispatch}) => {
    try {
        const token = getCookie('token')
        const res = await axios.get(`message/${id}`,{headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          }},)
        return res.data
    } catch (er) {
      throw er;
    }
  }
);

const Message = createSlice({
    name : 'message',
    initialState : {data : [],dataClient : [], isLoading: false, error: [], search:[], show:[]},
    extraReducers: (builder) => {
        builder.addCase(Messages.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(Messages.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(Messages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data= action.payload
            state.error = ""
        }),
        //add mesages
        builder.addCase(StoreMessages.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(StoreMessages.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(StoreMessages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data= action.payload
            state.error = ""
        }),
         //delet
         builder.addCase(deleteMsg.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(deleteMsg.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(deleteMsg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = ""
        }),
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
        state.show= action.payload
        state.error = ""
        })
    }
})

export default Message.reducer;