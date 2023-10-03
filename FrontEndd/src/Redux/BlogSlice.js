import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { getCookie } from './Utils';

export const posts = createAsyncThunk('blog/posts',async(url) => {
    try {
        const res = await axios.get(url);
        return res.data.data;
    } catch (er) {
        throw er;
    }  
});
//addNewPost
export const storePost = createAsyncThunk('blog/storePost',async(formData, {dispatch, rejectWithValue }) => {
    try {
        const token = getCookie('token')
        console.log(formData)
        const res = await axios.post('addNewPost',formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
              },
        });
        dispatch(posts())
        return res.data
    } catch (er) {
        return rejectWithValue(er.response.data);
    }  
});

export const deletePost = createAsyncThunk('blog/deletePost', async(id, {dispatch})=>{
    try{
        const token = getCookie('token')
        await axios.delete(`post/${id}`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            }})
        dispatch(posts())
        return id;
    }catch(er){
        throw er;
    }
})

export const handleSearch = createAsyncThunk('blog/handleSearch', async(query)=>{
    try{
        const token = getCookie('token')
        const res = await axios.post('search_post', { query }, {
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
export const updatePost = createAsyncThunk("blog/updatePost",async ({id, formData}, { rejectWithValue ,dispatch}) => {
    try {
        const token = getCookie('token')
      const response = await axios.post(`post/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      dispatch(posts());
      return response.data;
    } catch  (er) {
        return rejectWithValue(er.response.data)
    }
  }
);

//getById
export const ShowPost = createAsyncThunk('blog/ShowPost', async(id)=>{
    try{
        const res = await axios.get(`blog/article/${id}`)
        return res.data;
    }catch(er){
        throw er;
    }
})
  
const Blog = createSlice({
    name : 'blog',
    initialState : {data : [], isLoading: false, error: '', search:[], article:[]},
    extraReducers: (builder) => {
        builder.addCase(posts.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(posts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error)
        }),
        builder.addCase(posts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data= action.payload
            state.error = ""
        }),
        //add post
        builder.addCase(storePost.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(storePost.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(storePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = ""
        }),
         //delet
         builder.addCase(deletePost.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(deletePost.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(deletePost.fulfilled, (state, action) => {
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
         builder.addCase(updatePost.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(updatePost.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = ""
        }),
         //showPost
         builder.addCase(ShowPost.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(ShowPost.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(ShowPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.article = action.payload;
            state.error = ""
        })
    }
})

export default Blog.reducer;