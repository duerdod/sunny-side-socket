import * as React from 'react';
import styled from 'styled-components';
import { animated, useTransition } from 'react-spring';
import { useSocketState } from 'context/SocketContext';

const PersonContainer = styled.div`
  position: absolute;
  bottom: 25px;
  left: 25px;
`;

const Person = styled(animated.h1)`
  font-size: 4rem;
  font-family: 'Arial Black', sans-serif;
  font-weight: 900;
  color: #b0eacd;
`;

export const Connectees = () => {
  const { connections } = useSocketState();

  const transition = useTransition(connections, null, {
    unique: true,
    from: { transform: 'translate3d(0,500px,0)' },
    enter: { transform: 'translate3d(0,0,0)' },
    leave: {
      transform: 'translate3d(0,150px,0)',
      opacity: 0,
      position: 'absolute'
    },
    config: { duration: 75 }
  });

  return (
    <PersonContainer>
      {transition.map(({ item, props, key }) => (
        <Person style={props} key={key}>
          {item}
        </Person>
      ))}
    </PersonContainer>
  );
};
