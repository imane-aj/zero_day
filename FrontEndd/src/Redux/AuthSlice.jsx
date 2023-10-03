import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setCookie, removeCookie, getCookie  } from './Utils';
import axios from './Utils';


export const getPermissions = createAsyncThunk("auth/getPermissions",async ( rejectWithValue ) => {
  try {
    // const apiKey = {api_password: "Eld5TBhHgiIZgJk4c4VEtlnNxY"}
    const token = getCookie('token')
    const response = await axios.get("admins-permissions", {headers: {
          'Authorization': `Bearer ${token}`,
        },
  });
    return response.data;
  } catch  (er) {
    if(er.response.data.status === 422){
      return rejectWithValue(er.response.data.error)
    }
  }
  }
);


export const listPermissions = createAsyncThunk("auth/listPermissions",async ( rejectWithValue ) => {
  try {
    // const apiKey = {api_password: "Eld5TBhHgiIZgJk4c4VEtlnNxY"}
    const token = getCookie('token')
    const response = await axios.get("permissions", {headers: {
          'Authorization': `Bearer ${token}`,
        },
  });
    return response.data;
  } catch  (er) {
    if(er.response.data.status === 422){
      return rejectWithValue(er.response.data.error)
    }
  }
  }
);

export const userWithPermissions = createAsyncThunk("auth/userWithPermissions",async ( rejectWithValue ) => {
  try {
    // const apiKey = {api_password: "Eld5TBhHgiIZgJk4c4VEtlnNxY"}
    const token = getCookie('token')
    const response = await axios.get("getUsersWithPermissions", {headers: {
          'Authorization': `Bearer ${token}`,
        },
  });
    return response.data;
  } catch  (er) {
    if(er.response.data.status === 422){
      return rejectWithValue(er.response.data.error)
    }
  }
  }
);


export const Users = createAsyncThunk("auth/Users",async ( rejectWithValue ) => {
  try {
    // const apiKey = {api_password: "Eld5TBhHgiIZgJk4c4VEtlnNxY"}
    const token = getCookie('token')
    const response = await axios.get("users", {headers: {
          'Authorization': `Bearer ${token}`,
        },
  });
    return response.data;
  } catch  (er) {
    if(er.response.data.status === 422){
      return rejectWithValue(er.response.data.error)
    }
  }
  }
);

export const deleteUser = createAsyncThunk("auth/deleteUser",async (id, {dispatch,rejectWithValue} ) => {
  try {
    // const apiKey = {api_password: "Eld5TBhHgiIZgJk4c4VEtlnNxY"}
    const token = getCookie('token')
    await axios.delete(`users/${id}`, {headers: {
          'Authorization': `Bearer ${token}`,
        },
  });
  dispatch(Users())
  return id;
  } catch  (er) {
    if(er.response.data.status === 422){
      return rejectWithValue(er.response.data.error)
    }
  }
  }
);

export const NewUser = createAsyncThunk("auth/NewUser",async (user, { rejectWithValue }) => {
  try {
    // const apiKey = {api_password: "Eld5TBhHgiIZgJk4c4VEtlnNxY"}
    const response = await axios.post("/signup",user);
    const token = response.data.access_token;
    const loggedInUser = response.data.user;
    setCookie("token", token, 1);
    setCookie('currentUser', loggedInUser, 1);
     localStorage.setItem('role', response.data.user.role);
    return response.data;
  } catch  (er) {
    if(er.response.data.status === 422){
      return rejectWithValue(er.response.data.error)
    }
  }
}
);

export const loginUser = createAsyncThunk('auth/loginUser',async (user, { rejectWithValue }) => {
  try {
    // const apiKey = {api_password: "Eld5TBhHgiIZgJk4c4VEtlnNxY"}
    const response = await axios.post('/login',user);
    const token = response.data.access_token;
    const loggedInUser = response.data.user;

    setCookie('token', token, 1);
    setCookie('currentUser', loggedInUser, 1);


    localStorage.setItem('role', response.data.user.role);
    return response.data;
  } catch (er) {
    if(er.response.data.status === 401){
      return rejectWithValue(er.response.data.error)
    }
  }
}
);
export const loginUser2 = createAsyncThunk('auth/loginUser2',async (user, { rejectWithValue }) => {
  try {
    // const apiKey = {api_password: "Eld5TBhHgiIZgJk4c4VEtlnNxY"}
    const response = await axios.post('/login',user);
    const token = response.data.access_token;
    const loggedInUser = response.data.user;
    if(loggedInUser.role !== "admin"){

      setCookie('token', token, 1);
      setCookie('currentClient', loggedInUser, 1);
      localStorage.setItem('role', response.data.user.role);
     }


    localStorage.setItem('role', response.data.user.role);
    return response.data;
  } catch (er) {
    if(er.response.data.status === 401){
      return rejectWithValue(er.response.data.error)
    }
  }
}
);
export const logoutUser = createAsyncThunk('auth/logoutUser',async (_, thunkAPI) => {
  try {
    const yourApiToken = getCookie('token')
    const response = await axios.post('/logout', null, {
      headers: {
        Authorization: `Bearer ${yourApiToken}`,
      },
    });
    removeCookie('token');
    removeCookie('currentUser');
    console.log('from slice ',response)
    localStorage.removeItem('role');
    localStorage.clear();
    return response.data;
  } catch (er) {
    return thunkAPI.rejectWithValue(er.response.data);
  }
}
);

const Auth = createSlice({
    name : 'auth',
    initialState : {isLoading: false, error: '', isLogin:false, permissions:[], listPerm :[], users:[], search:[]},
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
          state.isLoading = true;
        }),
        builder.addCase(getPermissions.rejected, (state, action) => {
          state.isLogin = false
          state.isLoading = false;
          state.error = action.payload;
        }),
        builder.addCase(getPermissions.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isLogin = true;
          state.permissions = action.payload;
        }),
        builder.addCase(getPermissions.pending, (state) => {
          state.isLoading = true;
        }),
        builder.addCase(listPermissions.rejected, (state, action) => {
          state.isLogin = false
          state.isLoading = false;
          state.error = action.payload;
        }),
        builder.addCase(listPermissions.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isLogin = true;
          state.listPerm = action.payload;
        }),
        builder.addCase(listPermissions.pending, (state) => {
          state.isLoading = true;
        }),
        builder.addCase(loginUser.rejected, (state, action) => {
          state.isLogin = false
          state.isLoading = false;
          state.error = action.payload;
          console.log(state.error)
        }),
        builder.addCase(loginUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isLogin = true;
          state.user = action.payload;

        }),
        builder.addCase(loginUser2.rejected, (state, action) => {
          state.isLogin = false
          state.isLoading = false;
          state.error = action.payload;
          console.log(state.error)
        }),
        builder.addCase(loginUser2.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isLogin = true;
          state.user = action.payload;

        }),
        builder.addCase(NewUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isLogin = true;
          state.user = action.payload;
   
        }),
        builder.addCase(NewUser.pending, (state) => {
          state.isLoading = true;
        }),
        builder.addCase(NewUser.rejected, (state, action) => {
          state.isLogin = false
          state.isLoading = false;
          state.error = action.payload;
          // console.log(state.error)
        }),
        builder.addCase(logoutUser.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        builder.addCase(logoutUser.fulfilled, (state,action) => {
          state.user = action.payload;
          console.log(state.user)
          state.isLoading = false;
          state.error = null;
        })
        builder.addCase(logoutUser.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          console.log(state.error)
        });
        builder.addCase(userWithPermissions.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        builder.addCase(userWithPermissions.fulfilled, (state,action) => {
          state.data = action.payload;
          state.isLoading = false;
          state.error = null;
        })
        builder.addCase(userWithPermissions.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        })
        builder.addCase(Users.pending, (state) => {
          state.isLoading = true;
        }),
        builder.addCase(Users.rejected, (state, action) => {
          state.isLogin = false
          state.isLoading = false;
          state.error = action.payload;
        }),
        builder.addCase(Users.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isLogin = true;
          state.users = action.payload;
        })
          //delet
        builder.addCase(deleteUser.pending, (state) => {
          state.isLoading = true;
        }),
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
        builder.addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = ""
        })
      },
})

export default Auth.reducer;