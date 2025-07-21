import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type CharacterData } from '../services/network-requests/network-requests';
import type { RootState } from './store';

const initialState: CharacterData[] = [];
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<CharacterData>) => {
      state.push(action.payload);
    },
    clear: () => [],
  },
});
export const { increment, clear } = counterSlice.actions;
export const selectCount = (state: RootState) => state.counter.length;
export const selectCheckedCards = (state: RootState) => state.counter;
export default counterSlice.reducer;
