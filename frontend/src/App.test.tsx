import React from 'react'
import { configure, render, screen } from '@testing-library/react'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import MessageReducer from './silces/MessageSlice'
import SentMessagesReducer from './silces/SentMessagesSlice'
import UserReducer from './silces/UserSlice'
import { Provider } from 'react-redux'

test('renders the chat component', () => {
  const store = configureStore({
    reducer: {
      message: MessageReducer,
      sentMessages: SentMessagesReducer,
      user: UserReducer
    }
  })
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const chatElement = screen.getByText(/チャットを始めよう！/i)
  expect(chatElement).toBeInTheDocument()
})