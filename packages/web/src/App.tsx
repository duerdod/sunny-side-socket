import * as React from 'react';
import { Connectees } from 'components/Connectees';
import { Layout } from 'components/Layout';
import { Input } from 'components/Input';
import { Messages } from 'components/Messages';
import { BottomContainer } from 'components/Container';

function App() {
  return (
    <Layout>
      <Messages />
      <BottomContainer>
        <Connectees />
        <Input />
      </BottomContainer>
    </Layout>
  );
}

export default App;
