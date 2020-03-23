import * as React from 'react';
import styled from 'styled-components';
import { useSocketState } from 'context/SocketContext';
import { motion, AnimatePresence } from 'framer-motion';

const PersonContainer = styled.div`
  position: absolute;
  bottom: 25px;
  left: 25px;
`;

const Person = styled(motion.h2)`
  font-size: 4rem;
  font-family: 'Arial Black', sans-serif;
  font-weight: 900;
  color: #b0eacd;
`;

export const Connectees = () => {
  const { connections } = useSocketState();
  return (
    <PersonContainer>
      <AnimatePresence>
        <Person
          key={`${connections}-${connections}`}
          positionTransition
          animate={{ opacity: 1, y: -10, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          {connections}
        </Person>
      </AnimatePresence>
    </PersonContainer>
  );
};

/*

    <PersonContainer>
      <Person animate={{ y: 0 }} initial={{ y: -200 }}>
        {connections}
      </Person>
    </PersonContainer>

*/
