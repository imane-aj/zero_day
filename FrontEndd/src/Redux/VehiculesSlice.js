import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { getCookie } from './Utils'

export const cars = createAsyncThunk('vehicule/cars', async (url) => {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (er) {
        throw er;
    }
});
// //addNewPost
export const storeCar = createAsyncThunk('vehicule/storeCar', async (formData, { dispatch, rejectWithValue }) => {
    try {
        const token = getCookie('token');
        // const token = getCookie('token')
        console.log(formData)
        const res = await axios.post('new_vehicules', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        });
        dispatch(cars())
        return res.data
    } catch (er) {
        return rejectWithValue(er.response.data);
    }
});

export const deleteCar = createAsyncThunk('vehicule/deleteCar', async (id, { dispatch }) => {
    try {
        const token = getCookie('token')
        await axios.delete(`vehicule/${id}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'accept': 'application/json',
                  'Authorization': `Bearer ${token}`,
            }
        })
        dispatch(cars())
        return id;
    } catch (er) {
        throw er;
    }
})

export const handleSearch = createAsyncThunk('vehicule/handleSearch', async (query) => {
    try {
        const token = getCookie('token')
        const res = await axios.post('search_vehicule', { query }, {
            headers: {
                'accept': 'application/json',
                  'Authorization': `Bearer ${token}`,
            }
        },)
        return res.data
        // dispatch(BOwner({ url: null, data })); // Pass 'url' as null to indicate that it's not a paginated request
    } catch (er) {
        throw er;
    }
})

// //update
export const updateCar = createAsyncThunk("vehicule/updateCar", async ({ id, formData }, { dispatch, rejectWithValue }) => {
    try {
        const token = getCookie('token')
        const res = await axios.post(`vehicule/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'accept': 'application/json',
                  'Authorization': `Bearer ${token}`,
            },
        });
        dispatch(cars());
        return res.data;
    } catch (er) {
        return rejectWithValue(er.response.data)
    }
}
);

// //getById
export const ShowCar = createAsyncThunk('vehicule/ShowCar', async (id) => {
    try {
        const res = await axios.get(`vehicules/${id}`)
        return res.data;
    } catch (er) {
        throw er;
    }
})

const Vehicule = createSlice({
    name: 'vehicule',
    initialState: { data: [], isLoading: false, error: '', search: [], car: [] },
    extraReducers: (builder) => {
        builder.addCase(cars.pending, (state) => {
            state.isLoading = true;
        }),
            builder.addCase(cars.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                console.log(state.error)
            }),
            builder.addCase(cars.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload
                state.error = ""
            })
        // add post
        builder.addCase(storeCar.pending, (state) => {
            state.isLoading = true;
        }),
            builder.addCase(storeCar.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }),
            builder.addCase(storeCar.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = ""
            })
        //  //delet
        builder.addCase(deleteCar.pending, (state) => {
            state.isLoading = true;
        }),
            builder.addCase(deleteCar.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }),
            builder.addCase(deleteCar.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = ""
            })
        //search
        builder.addCase(ShowCar.pending, (state) => {
            state.isLoading = true;
        }),
            builder.addCase(ShowCar.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                console.log(state.error)
            }),
            builder.addCase(ShowCar.fulfilled, (state, action) => {
                state.isLoading = false;
                state.car = action.payload
                state.error = ""
            })
        //updatePost
        builder.addCase(updateCar.pending, (state) => {
            state.isLoading = true;
        }),
            builder.addCase(updateCar.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }),
            builder.addCase(updateCar.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = ""
            }),
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
                state.search = action.payload
                state.error = ""
            })
    }
})

export default Vehicule.reducer;