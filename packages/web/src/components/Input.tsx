import * as React from 'react';
import styled from 'styled-components';
import { useSocketMessage } from 'hooks/useSocketMessage';
import { useSocketConnection } from 'hooks/useSocketConnection';
import { useSocketProvider } from 'context/SocketContext';
import { useSocket } from 'hooks/useSocket';

const Form = styled.form`
  button {
    margin-left: 1rem;
    background: red;
    padding: 1.2rem 1rem;
  }
`;

const StyledInput = styled.textarea`
  height: 4rem;
`;

export const Input = () => {
  const [message, setMessage] = React.useState('');
  const socket = useSocket();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    socket.emit('NEW_MESSAGE', message);
    setMessage('');
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <StyledInput
          maxLength={140}
          name="message"
          onChange={e => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit">Send</button>
      </Form>
    </div>
  );
};
