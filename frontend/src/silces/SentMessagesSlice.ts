import { createSlice } from '@reduxjs/toolkit'

const SentMessagesSlice = createSlice({
  name: 'sentMessages',
  initialState: {
    messages: [
      {
        userId: 0,
        message: 'socketと通信できていないかもしれないよ',
      },
    ],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    setSentMessages: (state, action) => {
      state.messages = action.payload
    }
  },
})

export const { addMessage, setSentMessages } = SentMessagesSlice.actions
export default SentMessagesSlice.reducer
