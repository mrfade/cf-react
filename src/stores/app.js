import { createSlice } from "@reduxjs/toolkit";
import { setRobotThinking, addMessage } from "./chat";
import {
  setType,
  setValue,
  setName,
  setDisabled,
  setRequired,
  setPlaceholder,
  setValidation,
  setErrorMessage,
  setFilterKey,
  reset,
} from "./input";
import {
  setChecbokSelect,
  setOptions,
  setValue as setControlValue,
} from "./inputControl";
import { addAnswer, getFormData } from "./answer";
import { email, maxLength, minLength, required } from "../validations";

const robotImage = require("../assets/img/podo_1.png");
const userImage = require("../assets/img/podo_2.png");

const VALIDATIONS = {
  email,
  required,
  minLength,
  maxLength,
};

export const appSlice = createSlice({
  name: "app",
  initialState: {
    status: "waiting",
    robotDelay: 500,
    questions: [],
    currentQuestion: -1,
    formID: "",
    prevMode: false,
    successMessage: [],
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
    },
    setFormID: (state, action) => {
      state.formID = action.payload;
    },
    setPrevMode: (state, action) => {
      state.prevMode = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
  },
});

export const {
  setStatus,
  setRobotDelay,
  setQuestions,
  setCurrentQuestion,
  setFormID,
  setPrevMode,
  setSuccessMessage,
} = appSlice.actions;

export const _upHandler = () => (dispatch, getState) => {
  const { value: inputControlValue } = getState().inputControl;
  const { value, type } = getState().input;
  if (type == "checkbox") {
    dispatch(setFilterKey(value));
  }
  if (type == "checkbox" && value.length > 0) {
    dispatch(setChecbokSelect(value));
  } else {
    dispatch(validateAndSubmit());
  }
};

export const start = () => (dispatch, getState) => {
  if (getState().app.status !== "waiting") {
    return;
  }

  dispatch(setStatus("started"));
  dispatch(setCurrentQuestion(-1));

  nextQuestion()(dispatch, getState);
};

export const nextQuestion = () => (dispatch, getState) => {
  const { currentQuestion, questions, robotDelay } = getState().app;
  const nextQuestionIndex = currentQuestion + 1;

  if (nextQuestionIndex >= questions.length) {
    finished()(dispatch, getState);
    return;
  }

  const question = questions[nextQuestionIndex];
  dispatch(setCurrentQuestion(nextQuestionIndex));

  dispatch(
    addMessage({
      owner: "robot",
      thumb: robotImage,
      message: question.label,
    })
  );

  if (question.type === "robot-message") {
    setTimeout(() => {
      nextQuestion()(dispatch, getState);
    }, robotDelay);
    return;
  }

  // map options to make them string
  let options = [];
  if (question.options) {
    options = question.options.map((option) => option.toString());
  }

  dispatch(setType(question.type));
  dispatch(setValue(question.defaultValue ?? ""));
  dispatch(setName(question.name));
  dispatch(setDisabled(false));
  dispatch(setRequired(question.required ?? false));
  dispatch(setPlaceholder(question.placeholder ?? ""));
  dispatch(setValidation(question.validation ?? null));
  dispatch(setOptions(options ?? []));
};

export const finished = () => (dispatch, getState) => {
  dispatch(setStatus("finished"));
  dispatch(setCurrentQuestion(-1));
  dispatch(reset());

  const { formID, prevMode, successMessage, robotDelay } = getState().app;
  const formData = getFormData(getState());
  if (!prevMode) {
    fetch(
      "https://e-solak.jotform.dev/intern-api/conversational-form/" + formID,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
        successMessage.forEach(async (message, i) => {
          await sleep(i * (robotDelay + 337.5));
          dispatch(
            addMessage({
              owner: "robot",
              thumb: robotImage,
              message,
            })
          ); 
        });
      });
  }
};

export const validateAndSubmit = () => (dispatch, getState) => {
  const { robotDelay } = getState().app;
  const {
    type,
    value: inputValue,
    name,
    validation,
    disabled,
  } = getState().input;
  const { value: inputControlValue } = getState().inputControl;
  let filteredValue;
  if (type === "checkbox" || type === "radio" || type === "appointment") {
    filteredValue = inputControlValue.trim();
  } else {
    filteredValue = inputValue.trim();
  }
  if (disabled) {
    // if disabled, do not submit
    return;
  }

  let valid = true;
  let errorMessage = "";

  const buildErrorMessage = (message, values) => {
    if (values.length > 0) {
      values.forEach((value, index) => {
        message = message.replace(`\{${index}\}`, value);
      });
    }

    return message;
  };

  const handleValidation = (_validation) => {
    const [funcName, values] = _validation.split(":");
    const func = VALIDATIONS[funcName];

    if (!func) {
      return;
    }

    let _valid = true;
    let _errorMessage = "";

    if (typeof values === "string" || Array.isArray(values)) {
      const _values = values.split(",");
      _valid = func.handler(filteredValue, ..._values);
      _errorMessage = buildErrorMessage(func.errorMessage, _values);
    } else {
      _valid = func.handler(filteredValue);
      _errorMessage = func.errorMessage;
    }

    if (!_valid) {
      valid = false;
      errorMessage = _errorMessage;
      return;
    }
  };

  // run validations
  if (validation) {
    if (Array.isArray(validation)) {
      validation.forEach(handleValidation);
    } else {
      handleValidation(validation);
    }
  }

  if (!valid) {
    dispatch(setErrorMessage(errorMessage));
    dispatch(setValue(""));
    dispatch(setDisabled(true));
    setTimeout(() => {
      dispatch(setErrorMessage(""));
      dispatch(setValue(inputValue));
      dispatch(setDisabled(false));
    }, 2000);

    return;
  }

  if (valid) {
    dispatch(setValue(""));
    dispatch(setControlValue(""));
    dispatch(setDisabled(true));
    dispatch(
      addMessage({
        owner: "user",
        thumb: userImage,
        message: filteredValue,
      })
    );

    dispatch(
      addAnswer({
        name: name,
        value: filteredValue,
      })
    );

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
