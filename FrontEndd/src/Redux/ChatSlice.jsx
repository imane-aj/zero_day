import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setCookie, removeCookie, getCookie  } from './Utils';
import axios from './Utils';

export const chats = createAsyncThunk('chat/chats',async(url) => {
    const token = getCookie('token');
    try {
        const res = await axios.get(url,{headers:{
            'Authorization': `Bearer ${token}`,
    }});;
        return res.data.data;
    } catch (er) {
        throw er;
    }  
});

export const ShowChat = createAsyncThunk('chat/ShowChat', async(id)=>{
    try{
        console.log('from redux', id)
        const res = await axios.get(`chats/chat/${id}`)
        return res.data;
    }catch(er){
        throw er;
    }
})

export const storeMsg = createAsyncThunk('chat/storeMsg', async({formData,chat_id}, {dispatch, rejectWithValue })=>{
    try{
        const id = chat_id
        const yourApiToken = getCookie('token')
        const res = await axios.post(`chat/${chat_id}`, formData, {
            headers: {
              Authorization: `Bearer ${yourApiToken}`,
            },
        })
        dispatch(ShowChat(id))
        dispatch(chats())
        return res.data
    }catch(er){
        throw er;
    }
})


const Chat = createSlice({
    name : 'chat',
    initialState : {data:[], isLoading: false, error: '', isLogin:false, search:[], chat:[]},
    extraReducers: (builder) => {
        builder.addCase(chats.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(chats.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(chats.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data= action.payload
            state.error = ""
        }),
         //showChat
         builder.addCase(ShowChat.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(ShowChat.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(ShowChat.fulfilled, (state, action) => {
            state.isLoading = false;
            state.chat = action.payload;
            state.error = ""
        })
        //store
        builder.addCase(storeMsg.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(storeMsg.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(storeMsg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = ""
        })
      },
})

export default Chat.reducer;