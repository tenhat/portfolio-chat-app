import React from 'react'
import { Badge, Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Message } from '../../types/message'
import styled from 'styled-components'

export const ChatArea = () => {
  const { messages } = useSelector((state: any) => state.sentMessages)
  const { user } = useSelector((state: any) => state.user)

  const CustomBadge = styled(Badge)`
    font-size: 1.2rem;
    margin: 1rem;
    `

  return (
    <Container>
      {messages.map((message: Message, index: number) => {
        const isOwnMessage = message.userId === user.id
        return (
          <Row key={index}>
            <Col><CustomBadge bg="primary">{isOwnMessage ? '' : message.message}</CustomBadge></Col>
            <Col><CustomBadge bg="light" text="dark">
              {isOwnMessage ? message.message : ''}
            </CustomBadge></Col>
          </Row>
        )
      })}
    </Container>
  )
}
