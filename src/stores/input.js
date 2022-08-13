import { createSlice } from '@reduxjs/toolkit';

export const inputSlice = createSlice({
  name: 'input',
  initialState: {
    type: '',
    value: '',
    name: '',
    disabled: true,
    required: false,
    placeholder: '',
    validation: null, // validation type

    errorMessage: '',
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
    },

    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },

    reset: (state) => {
      state.type = '';
      state.value = '';
      state.name = '';
      state.disabled = true;
      state.required = false;
      state.placeholder = '';
      state.validation = null;
      state.errorMessage = '';
    }
  }
});

export const { setType, setValue, setName, setDisabled, setRequired, setPlaceholder, setValidation, setErrorMessage, reset } = inputSlice.actions;

export default inputSlice.reducer;
