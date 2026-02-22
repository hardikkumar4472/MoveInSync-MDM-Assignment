import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockRollouts } from '../../data/mockData';
export const fetchRollouts = createAsyncThunk(
  'rollouts/fetchRollouts',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1800));
      return mockRollouts;
    } catch (err) {
      return rejectWithValue('Failed to sync rollout schedules');
    }
  }
);
const initialState = {
  rollouts: [],
  selectedRollout: null,
  status: 'idle',
  error: null
};
const rolloutSlice = createSlice({
  name: 'rollouts',
  initialState,
  reducers: {
    setRollouts: (state, action) => {
      state.rollouts = action.payload;
    },
    addRollout: (state, action) => {
      state.rollouts.unshift(action.payload);
    },
    togglePause: (state, action) => {
      const rollout = state.rollouts.find(r => r.id === action.payload);
      if (rollout) {
        rollout.status = rollout.status === 'Paused' ? 'Active' : 'Paused';
      }
    },
    setSelectedRollout: (state, action) => {
      state.selectedRollout = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRollouts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRollouts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rollouts = action.payload;
      })
      .addCase(fetchRollouts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});
export const { setRollouts, addRollout, togglePause, setSelectedRollout } = rolloutSlice.actions;
export const selectAllRollouts = (state) => state.rollouts.rollouts;
export const selectSelectedRollout = (state) => state.rollouts.selectedRollout;
export const selectRolloutStatus = (state) => state.rollouts.status;
export const selectRolloutError = (state) => state.rollouts.error;
export default rolloutSlice.reducer;
