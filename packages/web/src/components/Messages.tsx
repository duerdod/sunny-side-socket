import * as React from 'react';
import styled from 'styled-components';
import { useSocketMessage } from 'hooks/useSocketMessage';
import { motion } from 'framer-motion';
import { Message, useSocketState } from 'context/SocketContext';

interface StyledMessageProps {
  x: number;
  y: number;
  zIndex: number;
}

const RemoveMessage = styled.button`
  position: absolute;
  top: -2px;
  right: 2px;
  color: white;
`;

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

  left: ${p => p.x}%;
  top: ${p => p.y}%;
  z-index: ${p => p.zIndex};
`;

const MessageText = styled.span``;

export function Messages() {
  const { messages } = useSocketState();
  const { deleteMessage } = useSocketMessage();
  return (
    <MessageContainer>
      {messages.map((message: Message) => {
        return (
          <StyledMessage
            key={message.id}
            animate={{ scale: 1.2 }}
            initial={{ scale: 1 }}
            drag={true}
            onDrag={x => console.log(x)}
            {...message.initialPosition}
          >
            <RemoveMessage onClick={() => deleteMessage(message)}>
              &times;
            </RemoveMessage>
            <MessageText>{message.text}</MessageText>
          </StyledMessage>
        );
      })}
    </MessageContainer>
  );
}
