import React from 'react'
import { Button, Form, InputGroup, useAccordionButton } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setMessage } from '../../silces/MessageSlice'
import { addMessage } from '../../silces/SentMessagesSlice'

export const InputForm = () => {
  console.log('InputForm')
  const dispatch = useDispatch()
  const { message } = useSelector((state: any) => state.message)
  const { user } = useSelector((state: any) => state.user)

  const handleChange = (e: React.ChangeEvent<any>) => {
    dispatch(setMessage(e.target.value))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('handleSubmit', user.id, message)
    e.preventDefault()
    dispatch(
      addMessage({
        userId: user.id,
        message: message,
      })
    )
    dispatch(setMessage(''))
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Enter your message"
          aria-label="Enter your message"
          aria-describedby="basic-addon2"
          value={message}
          onChange={handleChange}
        />
        <Button variant="outline-secondary" type="submit" id="button-addon2">
          Send
        </Button>
      </InputGroup>
    </Form>
  )
}
