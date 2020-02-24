import * as React from 'react';
import styled from 'styled-components';
import { Connectees } from './components/Connectees';

const AppContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: ${p => p.theme.background};
`;

function App() {
  return (
    <AppContainer>
      <Connectees />
    </AppContainer>
  );
}

export default App;
