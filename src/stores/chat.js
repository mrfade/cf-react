import { createSlice, current } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    robotThinking: false,
    responses: [
      // {
      //   owner: 'robot',
      //   thumb: robotImage,
      //   messages: [
      //     'Hello!',
      //     'How can I help you?',
      //     'I am a chatbot. I can help you with your queries.',
      //   ],
      // },
      // {
      //   owner: 'user',
      //   thumb: userImage,
      //   text: 'Hi!',
      // },
      // {
      //   owner: 'robot',
      //   thumb: robotImage,
      //   text: 'How are you?',
      // },
    ],
  },
  reducers: {
    setRobotThinking: (state, action) => {
      state.robotThinking = action.payload;
    },

    addMessage: (state, action) => {
      const { owner, thumb, message } = action.payload;
      
      const lastIndex = state.responses.length - 1;
      // check last message
      if (lastIndex >= 0 && state.responses[lastIndex] && state.responses[lastIndex]?.owner === owner) {
        const lastMessage = state.responses.slice(lastIndex)[0];

        if (lastMessage.hasOwnProperty('text')) {
          lastMessage.messages = [lastMessage.text, message];
          delete lastMessage.text;
        } else {
          lastMessage.messages = [...lastMessage.messages, message];
        }

        state.responses = [...state.responses.slice(0, lastIndex), lastMessage];
      } else {
        state.responses = [...state.responses, {
          owner: owner,
          thumb: thumb,
          messages: [message],
        }]
      }
    }
  }
});

export const { setRobotThinking, addMessage } = chatSlice.actions;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default chatSlice.reducer;
