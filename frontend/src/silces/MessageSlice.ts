import { createSlice } from '@reduxjs/toolkit'

const MessageSlice = createSlice({
  name: 'message',
  initialState: { message: '' },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
    },
  },
})

export const { setMessage } = MessageSlice.actions
export default MessageSlice.reducer
