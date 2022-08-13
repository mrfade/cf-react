import { createSlice } from '@reduxjs/toolkit';
import { setRobotThinking, addMessage } from './chat';
import { setType, setValue, setName, setDisabled, setRequired, setPlaceholder, setValidation, setErrorMessage } from './input';
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

      // action.payload.forEach((question) => {
      //   const _question = {
      //     type: question.type,
      //     label: question.label,
      //     name: question.name,
      //     placeholder: question.placeholder,
      //     required: question.required,
      //     validation: null,
      //     value: question.value,
      //   };

      //   if (Array.isArray(question.validation)) {
      //     const validations = [];
      //     question.validation.forEach((validation) => {
      //       if (VALIDATIONS[validation]) {
      //         validations.push(VALIDATIONS[validation]);
      //       }
      //     });
      //     _question.validation = validations;
      //   } else if (VALIDATIONS[question.validation]) {
      //     _question.validation = VALIDATIONS[question.validation];
      //   } else if (typeof question.validation === 'object' && typeof question.validation.handler === 'function') {
      //     _question.validation = question.validation;
      //   }

      //   questions.push(_question);
      // });

      // state.questions = questions;
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
  dispatch(setValidation(question.validation ?? null));
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
  const { value, name, validation } = getState().input;

  let valid = true;
  let errorMessage = '';

  const filteredValue = value.trim();

  // run validations
  if (validation) {
    if (Array.isArray(validation)) {
      validation.forEach((_validation) => {
        if (VALIDATIONS[_validation] && !VALIDATIONS[_validation].handler(filteredValue)) {
          valid = false;
          errorMessage = VALIDATIONS[_validation].errorMessage;
          return;
        }
      });
    } else if (VALIDATIONS[validation]) {
      if (!VALIDATIONS[validation].handler(filteredValue)) {
        valid = false;
        errorMessage = VALIDATIONS[validation].errorMessage;
      }
    }
  }

  if (!valid) {
    dispatch(setErrorMessage(errorMessage));
    dispatch(setValue(''));

    setTimeout(() => {
      dispatch(setErrorMessage(''));
      dispatch(setValue(value));
    }, 2000);

    return;
  }

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
