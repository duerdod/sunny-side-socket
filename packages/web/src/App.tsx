import * as React from 'react';
import { Connectees } from 'components/Connectees';
import { Layout } from 'components/Layout';
import { Input } from 'components/Input';
import { GridContainer } from 'components/Container';
import { Messages } from 'components/Messages';

function App() {
  return (
    <Layout>
      <Messages />
      <GridContainer>
        <Connectees />
        <Input />
      </GridContainer>
    </Layout>
  );
}

export default App;
