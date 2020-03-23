import * as React from 'react';
import { useSocketMessage } from 'hooks/useSocketMessage';

export function Messages() {
  const { messages } = useSocketMessage();
  console.log(messages);
  return (
    <ul>
      {messages.map((message, i) => (
        <li key={message + i}>{message}</li>
      ))}
    </ul>
  );
}
