import * as React from 'react';
import styled from 'styled-components';
import { animated, useTransition } from 'react-spring';
import { useSocket } from '../hooks/useSocket';

const PersonContainer = styled.div`
  position: relative;
`;

const Person = styled(animated.h1)`
  font-size: 4rem;
  font-family: 'Arial Black';
  font-weight: 900;
  text-align: center;
  position: absolute;
`;

export const Connectees = () => {
  const { connections } = useSocket();

  const transition = useTransition(connections, null, {
    unique: true,
    from: { transform: 'translate3d(0,100px,0)' },
    enter: { transform: 'translate3d(0,0,0)' },
    leave: { transform: 'translate3d(0,100px,0)', opacity: 0 },
    config: { duration: 125 }
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
