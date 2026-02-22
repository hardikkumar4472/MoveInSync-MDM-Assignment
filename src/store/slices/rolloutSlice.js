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
    approveRollout: (state, action) => {
      const rollout = state.rollouts.find(r => r.id === action.payload);
      if (rollout) rollout.status = 'Active';
    },
    cancelRollout: (state, action) => {
      state.rollouts = state.rollouts.filter(r => r.id !== action.payload);
    },
    setSelectedRollout: (state, action) => {
      state.selectedRollout = action.payload;
    },
    simulateProgress: (state) => {
      state.rollouts.forEach(rollout => {
        if (rollout.status === 'Active' && rollout.progress < 100) {
          const inc = Math.floor(Math.random() * 5) + 1;
          rollout.progress = Math.min(100, rollout.progress + inc);
          if (rollout.stages.scheduled > 0) {
            const move = Math.floor(Math.random() * 50) + 10;
            const actualMove = Math.min(rollout.stages.scheduled, move);
            rollout.stages.scheduled -= actualMove;
            rollout.stages.notified += actualMove;
          } else if (rollout.stages.notified > 0) {
            const move = Math.floor(Math.random() * 40) + 5;
            const actualMove = Math.min(rollout.stages.notified, move);
            rollout.stages.notified -= actualMove;
            rollout.stages.downloading += actualMove;
          } else if (rollout.stages.downloading > 0) {
            const move = Math.floor(Math.random() * 30) + 5;
            const actualMove = Math.min(rollout.stages.downloading, move);
            rollout.stages.downloading -= actualMove;
            rollout.stages.installing += actualMove;
          } else if (rollout.stages.installing > 0) {
            const move = Math.floor(Math.random() * 20) + 5;
            const actualMove = Math.min(rollout.stages.installing, move);
            rollout.stages.installing -= actualMove;
            rollout.stages.completed += actualMove;
          }
        }
      });
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
        const existingIds = new Set(state.rollouts.map(r => r.id));
        const newItems = action.payload.filter(r => !existingIds.has(r.id));
        state.rollouts = [...state.rollouts, ...newItems];
      })
      .addCase(fetchRollouts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});
export const { setRollouts, addRollout, togglePause, approveRollout, cancelRollout, setSelectedRollout, simulateProgress } = rolloutSlice.actions;
export const selectAllRollouts = (state) => state.rollouts.rollouts;
export const selectSelectedRollout = (state) => state.rollouts.selectedRollout;
export const selectRolloutStatus = (state) => state.rollouts.status;
export const selectRolloutError = (state) => state.rollouts.error;
export default rolloutSlice.reducer;
