import * as React from 'react';
import { Connectees } from 'components/Connectees';
import { Layout } from 'components/Layout';
import { Input } from 'components/Input';
import { Messages } from 'components/Messages';
import { BottomContainer } from 'components/Container';

import io from 'socket.io-client';
import { isProduction } from 'utils';
import { useSocketEmitters } from 'hooks/useSocketEmitters';

const ENDPOINT = isProduction()
  ? process.env.REACT_APP_SOCKET_HOST
  : process.env.REACT_APP_SOCKET_HOST_DEV;

export const socket = io(ENDPOINT as string);

function App() {
  useSocketEmitters(socket);
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
