import * as React from 'react';
import styled from 'styled-components';
import { useSocketMessage } from 'hooks/useSocketMessage';
import { motion, AnimatePresence } from 'framer-motion';

interface StyledMessageProps {
  x: number;
  y: number;
}

const MessageContainer = styled.ul`
  width: 100%;
  height: 90%;
  position: absolute;
`;

const StyledMessage = styled(motion.li)<StyledMessageProps>`
  position: absolute;

  padding: 1rem;
  background: ${p => p.theme.purple};
  color: ${p => p.theme.white};
  font-family: Arial, Helvetica, sans-serif;

  left: ${p => p.x}%;
  top: ${p => p.y}%;
`;

export function Messages() {
  const { messages } = useSocketMessage();
  return (
    <MessageContainer>
      <AnimatePresence>
        {messages.map((message, i) => {
          const { x, y } = message.initialPosition;
          return (
            <StyledMessage
              key={i}
              {...message.initialPosition}
              drag="x"
              animate={{ scale: 1.2 }}
            >
              {message.text}
            </StyledMessage>
          );
        })}
      </AnimatePresence>
    </MessageContainer>
  );
}
