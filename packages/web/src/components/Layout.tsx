import * as React from 'react';
import styled from 'styled-components';

const MaxWidth = styled.main`
  position: relative;
  display: flex;
  height: 100%;
  overflow: hidden;
`;

export const Layout: React.FC = ({ children }) => (
  <MaxWidth>{children}</MaxWidth>
);
