import * as React from 'react';
import { Connectees } from 'components/Connectees';
import { Layout } from 'components/Layout';
import { Input } from 'components/Input';
import { Messages } from 'components/Messages';

function App() {
  return (
    <Layout>
      <Messages />
      <Connectees />
      <Input />
    </Layout>
  );
}

export default App;
