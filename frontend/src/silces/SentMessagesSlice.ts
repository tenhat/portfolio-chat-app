import { createSlice } from '@reduxjs/toolkit'

const SentMessagesSlice = createSlice({
  name: 'sentMessages',
  initialState: {
    messages: [
      {
        userId: 1,
        message: 'チャットを始めよう！',
      },
    ],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
  },
})

export const { addMessage } = SentMessagesSlice.actions
export default SentMessagesSlice.reducer
