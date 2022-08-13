import { configureStore } from '@reduxjs/toolkit';
import appReducer from './app';
import inputReducer from './input';
import answerReducer from './answer';
import chatReducer from './chat';
import inputControlReducer from './inputControl';

export const store = configureStore({
  reducer: {
    app: appReducer,
    input: inputReducer,
    answer: answerReducer,
    chat: chatReducer,
    inputControl: inputControlReducer,
  },
});
