import { createSlice } from '@reduxjs/toolkit';
import { setRobotThinking, addMessage } from './chat';
import { setType, setValue, setName, setDisabled, setRequired, setPlaceholder } from './input';
import { addAnswer, getFormData } from './answer';
import { email, maxLength, minLength, required } from '../validations';

const robotImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMTAwIiBmaWxsPSIjRTVFNkVBIi8+CjxyZWN0IHg9IjY2IiB5PSI2NiIgd2lkdGg9IjY4IiBoZWlnaHQ9IjY4IiBmaWxsPSIjMzAzMDMwIi8+Cjwvc3ZnPgo=";
const userImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMTAwIiBmaWxsPSIjMzAzMDMwIi8+CjxwYXRoIGQ9Ik0xMDAgNTVMMTM4Ljk3MSAxMjIuNUg2MS4wMjg5TDEwMCA1NVoiIGZpbGw9IiNFNUU2RUEiLz4KPC9zdmc+Cg==";

const VALIDATIONS = {
  email,
  required,
  minLength,
  maxLength,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: 'waiting',
    robotDelay: 500,
    questions: [],
    currentQuestion: -1,
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },

    setRobotDelay: (state, action) => {
      state.robotDelay = action.payload;
    },

    setQuestions: (state, action) => {
      // const questions = [];
      state.questions = action.payload;
    },

    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    }
  }
});

export const { setStatus, setRobotDelay, setQuestions, setCurrentQuestion } = appSlice.actions;

export const start = () => (dispatch, getState) => {
  dispatch(setStatus('started'));
  dispatch(setCurrentQuestion(-1));
  
  nextQuestion()(dispatch, getState);
}

export const nextQuestion = () => (dispatch, getState) => {
  const { currentQuestion, questions, robotDelay } = getState().app;
  const nextQuestionIndex = currentQuestion + 1;

  if (nextQuestionIndex >= questions.length) {
    finished()(dispatch, getState);
    return;
  }

  const question = questions[nextQuestionIndex];
  dispatch(setCurrentQuestion(nextQuestionIndex));

  dispatch(addMessage({
    owner: 'robot',
    thumb: robotImage,
    message: question.label,
  }));

  if (question.type === 'robot-message') {
    setTimeout(() => {
      nextQuestion()(dispatch, getState);
    }, robotDelay);
    return;
  }

  dispatch(setType(question.type));
  dispatch(setValue(question.defaultValue ?? ''));
  dispatch(setName(question.name));
  dispatch(setDisabled(false));
  dispatch(setRequired(question.required ?? false));
  dispatch(setPlaceholder(question.placeholder ?? ''));
}

export const finished = () => (dispatch, getState) => {
  
  dispatch(setStatus('finished'));
  dispatch(setCurrentQuestion(-1));

  dispatch(addMessage({
    owner: 'robot',
    thumb: robotImage,
    message: 'Thank you for your time!',
  }));

  const formData = getFormData(getState());
  console.log('formData', Object.fromEntries(formData));
}

export const validateAndSubmit = () => (dispatch, getState) => {
  const { robotDelay } = getState().app;
  const { value, name } = getState().input;

  let valid;

  const filteredValue = value.trim();

  valid = filteredValue.length > 0;

  // TODO: validate input

  if (valid) {
    dispatch(setValue(''));
    dispatch(setDisabled(true));
    dispatch(addMessage({
      owner: 'user',
      thumb: userImage,
      message: filteredValue,
    }));

    dispatch(addAnswer({
      name: name,
      value: filteredValue,
    }));

    setTimeout(() => {
      dispatch(setRobotThinking(true));
    }, robotDelay);

    setTimeout(() => {
      // dispatch(addMessage({
      //   owner: 'robot',
      //   thumb: robotImage,
      //   message: 'I received your message! ' + value,
      // }));

      dispatch(setRobotThinking(false));

      nextQuestion()(dispatch, getState);
    }, robotDelay * 2);
  }


};

export default appSlice.reducer;
