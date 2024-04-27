import axiosInstance from "@/utilities/configureAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  data: null,
  loading: false,
  error: null,
};

// Define the async thunk for fetching data
export const salonListByid = createAsyncThunk(
  "data/fetch",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `admin/salon/list/${payload?.id}?include=${payload?.include}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(salonListByid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(salonListByid.fulfilled, (state, action) => {
        state.loading = false;
        // If data is not initialized, initialize it as an empty object
        if (!state.data) {
          state.data = {};
        }
        // Add the payload data to the corresponding include key
        state.data[action.meta.arg.include] = action.payload;
      })
      .addCase(salonListByid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dataSlice.reducer;
