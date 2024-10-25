import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (pageXOffset, thunkAPI) => {
    const url = `https://gorest.co.in/public/v2/users?page=${pageXOffset}&per_page=10`;

    const res = await axios.get(url);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    page: 1,
    loading: false,
    hasMore: true,
  },
  reducers: {
    incrementPage: (state) => {
      state.page = state.page + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = [...action.payload, ...state.users];
        state.loading = false;
        if (action.payload.length === 0) {
          state.hasMore = false;
        }
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { incrementPage } = userSlice.actions;
export default userSlice.reducer;
