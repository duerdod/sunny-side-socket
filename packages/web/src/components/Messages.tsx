import * as React from 'react';
import styled from 'styled-components';
import { useSocketMessage } from 'hooks/useSocketMessage';
import { motion } from 'framer-motion';
import { Message } from 'context/SocketContext';
import { socket } from '../App';

interface StyledMessageProps {
  x: number;
  y: number;
  zIndex: number;
}

const MessageContainer = styled.ul`
  width: 100%;
  height: calc(100% - 100px);
  position: absolute;
  list-style: none;
`;

const StyledMessage = styled(motion.li)<StyledMessageProps>`
  position: absolute;

  padding: 1.1rem;
  background: ${p => p.theme.purple.tint[2]};
  color: ${p => p.theme.white};
  font-family: Arial, Helvetica, sans-serif;

  max-width: 300px;
  /* min-width: 150px; */

  left: ${p => p.x}%;
  top: ${p => p.y}%;
  z-index: ${p => p.zIndex};
`;

export function Messages() {
  const { messages } = useSocketMessage();
  return (
    <MessageContainer>
      {messages.map((message: Message) => {
        const { x, y } = message.initialPosition;
        return (
          <StyledMessage
            key={x + y}
            animate={{ scale: 1.2 }}
            initial={{ scale: 1 }}
            drag={true}
            {...message.initialPosition}
            onClick={() => socket.emit('DELETE_MESSAGE', message.id)}
          >
            {message.text}
          </StyledMessage>
        );
      })}
    </MessageContainer>
  );
}
