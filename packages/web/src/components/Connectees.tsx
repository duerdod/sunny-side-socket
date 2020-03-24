import * as React from 'react';
import styled from 'styled-components';
import { useSocketState } from 'context/SocketContext';
import { motion, AnimatePresence } from 'framer-motion';

const Person = styled(motion.h2)`
  font-size: 4rem;
  font-family: 'Arial Black', sans-serif;
  font-weight: 900;
  color: ${p => p.theme.pink};
  grid-area: connected;
`;

export const Connectees = () => {
  const { connections } = useSocketState();
  return (
    <AnimatePresence>
      <Person
        key={`${connections}-${connections}`}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }}
        exit={{
          opacity: 0,
          y: -50,
          scale: 0.5
        }}
        positionTransition
      >
        {connections}
      </Person>
    </AnimatePresence>
  );
};

/*

    <PersonContainer>
      <Person animate={{ y: 0 }} initial={{ y: -200 }}>
        {connections}
      </Person>
    </PersonContainer>

*/
