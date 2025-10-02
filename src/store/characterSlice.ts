import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type FullCharacterData } from '../services/api';
import type { RootState } from './store';

const initialState: FullCharacterData[] = [];
export const charactersSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    characterAdded: (state, action: PayloadAction<FullCharacterData>) => {
      state.push(action.payload);
    },
    characterRemoved: (state, action: PayloadAction<FullCharacterData>) => {
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
export const selectCheckedCharacters = (state: RootState) =>
  state.checkedCharacters;
export default charactersSlice.reducer;
