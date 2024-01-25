import React, { useEffect } from 'react'
import { Badge, Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Message } from '../../types/message'
import styled from 'styled-components'
import socket from '../../utils/socket'
import { setSentMessages } from '../../silces/SentMessagesSlice'
import { useDispatch } from 'react-redux'

export const ChatArea = () => {
  const { messages } = useSelector((state: any) => state.sentMessages)
  const { user } = useSelector((state: any) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('load_messages', (data: any) => {
      console.log('load_messages', data)
      const convertedData = data.map((each: any) => {
        return {
          userId: each.user_id,
          message: each.message,
        }
      }
      )
      dispatch(setSentMessages(convertedData))
    })

    return () => {
      socket.off('load_messages')
    }
  }, [dispatch, messages])

  const CustomBadge = styled(Badge)`
    font-size: 1.2rem;
    margin: 1rem;
    `

  return (
    <Container>
      {messages?.map((message: Message, index: number) => {
        const isOwnMessage = message.userId === user.id
        console.log('isOwnMessage', message, isOwnMessage, user.id, message.userId)
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
