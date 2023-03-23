import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//url
import { baseUrl, busStopsList } from "../../api";

const initialState = {
  loading: false,
  value: [],
  error: "",
};

export const fetchBusStopsList = createAsyncThunk(
  "busStopsList/fetchBusStopsList",
  async () => {
    const response = await axios(`${baseUrl}${busStopsList}`);
    return response.data;
  }
);

const busStopsListSlice = createSlice({
  name: "bus stops list",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBusStopsList.pending, (state) => {
      console.log("weszlo w load");
      state.loading = true;
    });
    builder.addCase(fetchBusStopsList.fulfilled, (state, action) => {
      console.log("weszlo w dodanie");
      state.loading = false;
      state.value = action.payload;
      state.error = "";
    });
    builder.addCase(fetchBusStopsList.rejected, (state, action) => {
      console.log("weszlo w error");
      state.loading = false;
      state.value = [];
      state.error = action.error.message;
      console.log(state.error);
    });
  },
});

export default busStopsListSlice.reducer;
