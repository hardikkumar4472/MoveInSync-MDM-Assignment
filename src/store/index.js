import { configureStore } from '@reduxjs/toolkit';
import deviceReducer from './slices/deviceSlice';
import rolloutReducer from './slices/rolloutSlice';
export const store = configureStore({
  reducer: {
    devices: deviceReducer,
    rollouts: rolloutReducer
  }
});
