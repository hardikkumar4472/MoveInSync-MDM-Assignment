import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockDevices } from '../../data/mockData';
export const fetchDevices = createAsyncThunk(
  'devices/fetchDevices',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (Math.random() < 0.1) {
        throw new Error('Network timeout while fetching device inventory');
      }
      
      return mockDevices;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const initialState = {
  devices: [],  
  selectedDevice: null,
  status: 'idle', 
  error: null
};
const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setDevices: (state, action) => {
      state.devices = action.payload;
    },
    setSelectedDevice: (state, action) => {
      state.selectedDevice = action.payload;
    },
    updateDevice: (state, action) => {
      const index = state.devices.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.devices[index] = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.devices = action.payload;
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});
export const { setDevices, setSelectedDevice, updateDevice } = deviceSlice.actions;
export const selectAllDevices = (state) => state.devices.devices;
export const selectDeviceStatus = (state) => state.devices.status;
export const selectDeviceError = (state) => state.devices.error;
export const selectSelectedDevice = (state) => state.devices.selectedDevice;
export default deviceSlice.reducer;