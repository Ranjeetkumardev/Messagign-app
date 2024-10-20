import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch logged-in user by ID
export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/users/${userId}` , { withCredentials: true });
      return response.data.user; // Adjust based on your API response
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedInUser: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;







// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { apiSlice } from './apiSlice';

// // Thunk for fetching a user by ID
// export const fetchUserById = createAsyncThunk(
//   'user/fetchUserById',
//   async (userId, { dispatch }) => {
//     const response = await dispatch(apiSlice.endpoints.getUserById.initiate(userId));
//     return response.data;
//   }
// );

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     loggedInUser: null,
//     selectedUser: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     setSelectedUser: (state, action) => {
//       state.selectedUser = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserById.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchUserById.fulfilled, (state, action) => {
//         state.loggedInUser = action.payload;
//         state.status = 'succeeded';
//       })
//       .addCase(fetchUserById.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setSelectedUser } = userSlice.actions;

// export default userSlice.reducer;
