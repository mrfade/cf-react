import { createSlice } from '@reduxjs/toolkit';

export const inputControlSlice = createSlice({
  name: 'inputControl',
  initialState: {
    options: [], // string or array of strings or function
    value: '',
  },
  reducers: {
    setOptions: (state, action) => {
      state.options = action.payload;
    },
    setValue: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { setOptions, setValue } = inputControlSlice.actions;

export default inputControlSlice.reducer;
