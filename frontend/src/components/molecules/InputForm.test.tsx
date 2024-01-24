import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import MessageReducer from "../../silces/MessageSlice";
import SentMessagesReducer from "../../silces/SentMessagesSlice";
import UserReducer from "../../silces/UserSlice";
import { InputForm } from "./InputForm";

const store = configureStore({
    reducer: {
        message: MessageReducer,
        sentMessages: SentMessagesReducer,
        user: UserReducer,
    }
})

test("allows user to input a message and send it", () => {
    render(
        <Provider store={store}>
            <InputForm />
        </Provider>
    )
    const inputElement = screen.getByPlaceholderText(/enter your message/i)
    const sendButton = screen.getByText(/send/i)

    fireEvent.change(inputElement, { target: { value: "Hello World" } })
    fireEvent.click(sendButton)

    const state = store.getState()
    expect(state.sentMessages.messages).toContainEqual({ userId: 0, message: "Hello World"})
})