import { configureStore } from '@reduxjs/toolkit'
import MessageReducer from '../silces/MessageSlice'
import SentMessagesReducer from '../silces/SentMessagesSlice'
import UserReducer from '../silces/UserSlice'

export const store = configureStore({
  reducer: {
    message: MessageReducer,
    sentMessages: SentMessagesReducer,
    user: UserReducer,
  },
})
