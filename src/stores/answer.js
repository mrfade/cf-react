import { createSlice } from '@reduxjs/toolkit';

export const answerSlice = createSlice({
  name: 'answer',
  initialState: {
    answers: [],
  },
  reducers: {
    addAnswer: (state, action) => {
      state.answers = [...state.answers, action.payload];
    },

    editAnswer: (state, action) => {
      state.answers = state.answers.map((answer, i)=> {
        if (i == action.payload.id) {
          return {
            ...answer,
            value: action.payload.answer
          };
        }

        return answer;
      });
    }
  }
});

export const { addAnswer, editAnswer } = answerSlice.actions;

export const getFormData = state => {
  const { answers } = state.answer;
  const formData = new FormData();
  answers.forEach(answer => {
    formData.append(answer.name, answer.value);
  });

  return formData;
}

export default answerSlice.reducer;
