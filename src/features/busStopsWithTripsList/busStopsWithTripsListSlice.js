import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//url
import { busStopsLinkedWithTripUrl } from "../../api";

const initialState = {
  loading: false,
  value: [],
  error: "",
};

export const fetchbusStopsLinkedWithTrip = createAsyncThunk(
  "busStopsLinkedWithTrip/fetchbusStopsLinkedWithTrip",
  async () => {
    const response = await axios(busStopsLinkedWithTripUrl);
    return response.data;
  }
);

const busStopsLinkedWithTripSlice = createSlice({
  name: "bus stops linked with trip",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchbusStopsLinkedWithTrip.pending, (state) => {
      console.log("weszlo w load");
      state.loading = true;
    });
    builder.addCase(fetchbusStopsLinkedWithTrip.fulfilled, (state, action) => {
      console.log("weszlo w dodanie");
      state.loading = false;
      state.value = action.payload;
      state.error = "";
    });
    builder.addCase(fetchbusStopsLinkedWithTrip.rejected, (state, action) => {
      console.log("weszlo w error");
      state.loading = false;
      state.value = [];
      state.error = action.error.message;
    });
  },
});

export default busStopsLinkedWithTripSlice.reducer;
