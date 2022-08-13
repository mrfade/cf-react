import { createSlice } from '@reduxjs/toolkit';

export const inputControlSlice = createSlice({
  name: 'inputControl',
  initialState: {
    type: '',
    value: '',
    name: '',
    disabled: true,
    required: false,
    placeholder: '',
    validation: null, // string or array of strings or function
  },
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },

    setValue: (state, action) => {
      state.value = action.payload;
    },

    setName: (state, action) => {
      state.name = action.payload;
    },

    setDisabled: (state, action) => {
      state.disabled = action.payload;
    },

    setRequired: (state, action) => {
      state.required = action.payload;
    },

    setPlaceholder: (state, action) => {
      state.placeholder = action.payload;
    },

    setValidation: (state, action) => {
      state.validation = action.payload;
    }
  }
});

export const { setType, setValue, setName, setDisabled, setRequired, setPlaceholder, setValidation } = inputControlSlice.actions;

export default inputControlSlice.reducer;
