import * as React from 'react';
import { useSocketMessage } from 'hooks/useSocketMessage';

export function Messages() {
  const { messages } = useSocketMessage();

  return (
    <ul>
      {messages.map(message => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
}
