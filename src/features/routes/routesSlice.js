import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//url
import { routesUrl } from "../../api";

const initialState = {
  loading: false,
  value: [],
  error: "",
};

export const fetchRoutes = createAsyncThunk("routes/fetchRoutes", async () => {
  const response = await axios(routesUrl);
  return response.data;
});

const routesSlice = createSlice({
  name: "routes",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRoutes.pending, (state) => {
      console.log("weszlo w load");
      state.loading = true;
    });
    builder.addCase(fetchRoutes.fulfilled, (state, action) => {
      console.log("weszlo w dodanie");
      state.loading = false;
      state.value = action.payload;
      state.error = "";
    });
    builder.addCase(fetchRoutes.rejected, (state, action) => {
      console.log("weszlo w error");
      state.loading = false;
      state.value = [];
      state.error = action.error.message;
    });
  },
});

export default routesSlice.reducer;
