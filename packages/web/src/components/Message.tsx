import * as React from 'react';
import styled from 'styled-components';
import { useSocketMessage } from 'hooks/useSocketMessage';
import { motion } from 'framer-motion';
import { Message } from 'context/SocketContext';

interface StyledMessageProps {
  x?: number;
  y?: number;
  zIndex: number;
}

interface MessageProps {
  message: Message;
}

const RemoveMessage = styled.button`
  position: absolute;
  top: -2px;
  right: 2px;
  color: white;
`;

const StyledMessage = styled(motion.li)<StyledMessageProps>`
  position: absolute;

  padding: 1.1rem;
  background: ${p => p.theme.purple.tint[2]};
  color: ${p => p.theme.white};
  font-family: Arial, Helvetica, sans-serif;

  border-radius: 5px;

  max-width: 300px;
  z-index: ${p => p.zIndex};
`;

const MessageText = styled.span``;

export function MessageComponent({ message }: MessageProps) {
  const { deleteMessage, updateMessagePosition } = useSocketMessage();
  const { x, y } = message.initialPosition;
  return (
    <StyledMessage
      animate={{ scale: 1.2, x, y }}
      initial={{ scale: 0, x, y }}
      drag
      onDragEnd={(_, info) => {
        const { x, y } = info.point;
        updateMessagePosition({
          ...message,
          initialPosition: {
            ...message.initialPosition,
            x,
            y
          }
        });
      }}
      {...message.initialPosition}
    >
      <RemoveMessage onClick={() => deleteMessage(message)}>
        &times;
      </RemoveMessage>
      <MessageText>{message.text}</MessageText>
    </StyledMessage>
  );
}
