import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin-top: auto;
  display: grid;
  grid-template-columns: 60px 1fr;
  align-items: center;
`;

export const GridContainer: React.FC = ({ children }) => (
  <Container>{children}</Container>
);
