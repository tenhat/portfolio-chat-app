import React from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { InputForm } from '../molecules/InputForm'
import { Header } from '../molecules/Header'
import { ChatArea } from '../molecules/ChatArea'
import ResponsiveLayout from '../organisms/ResponsiveLayout'

// type Props = {
//   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
// }

export const Chat = () => {
  return (
    <>
      <ResponsiveLayout>
        <ChatArea />
        <InputForm />
      </ResponsiveLayout>
    </>
  )
}
