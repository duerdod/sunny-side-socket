import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 80px;
  width: 100%;
  margin-top: auto;
  background: ${p => p.theme.white};
  display: grid;
  grid-template-areas: 'connected space input';
  align-items: center;
  grid-template-rows: 80px;
  padding: 0 1rem;
  .input-area {
    grid-area: input;
    justify-self: end;
  }
`;

export const BottomContainer: React.FC = ({ children }) => (
  <Container>{children}</Container>
);
