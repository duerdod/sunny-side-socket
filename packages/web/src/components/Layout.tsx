import * as React from 'react';
import styled from 'styled-components';

const MaxWidth = styled.main`
  max-width: 80rem;
  padding: 1rem;
  display: flex;
  height: 100%;
`;

export const Layout: React.FC = ({ children }) => (
  <MaxWidth>{children}</MaxWidth>
);
