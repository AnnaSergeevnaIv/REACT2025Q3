import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type CharacterData } from '../services/network-requests/network-requests';
import type { RootState } from './store';

const initialState: CharacterData[] = [];
export const charactersSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    characterAdded: (state, action: PayloadAction<CharacterData>) => {
      state.push(action.payload);
    },
    characterRemoved: (state, action: PayloadAction<CharacterData>) => {
      const index = state.findIndex(
        (character) => character.name === action.payload.name
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    stateCleared: () => [],
  },
});
export const { characterAdded, characterRemoved, stateCleared } =
  charactersSlice.actions;
export const selectCount = (state: RootState) => state.counter.length;
export const selectCheckedCharacters = (state: RootState) => state.counter;
export default charactersSlice.reducer;
