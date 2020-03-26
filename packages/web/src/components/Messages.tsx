import * as React from 'react';
import styled from 'styled-components';
import { Message as IMessage, useSocketState } from 'context/SocketContext';
import { MessageComponent } from 'components/Message';

const MessageContainer = styled.ul`
  width: 100%;
  height: calc(100% - 100px);
  position: absolute;
  list-style: none;
`;

export function Messages() {
  const { messages } = useSocketState();

  return (
    <MessageContainer>
      {messages.map((message: IMessage) => {
        return <MessageComponent key={message.id} message={message} />;
      })}
    </MessageContainer>
  );
}
