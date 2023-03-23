import { configureStore } from "@reduxjs/toolkit";

//Reducers
import busStopsListReducer from "./features/busstopsList/busStopsListSlice";
import busStopsWithTripsListReducer from "./features/busStopsWithTripsList/busStopsWithTripsListSlice";
import routesReducer from "./features/routes/routesSlice";

export default configureStore({
  reducer: {
    busStopsList: busStopsListReducer,
    busStopsWithTripsList: busStopsWithTripsListReducer,
    routes: routesReducer,
  },
});
