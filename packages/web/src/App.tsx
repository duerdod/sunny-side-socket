import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';

const ENDPOINT = 'http://localhost:4000';
const socket = io(ENDPOINT);

interface Connections {
  connections: number;
}

function App() {
  const [connected, setConnected] = useState(0);

  useEffect(() => {
    socket.on('init', ({ connections }: Connections) => {
      setConnected(connections);
    });

    socket.on('destroy', ({ connections }: Connections) => {
      setConnected(connections);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <div className="App">
      <Connectees connections={connected} />
    </div>
  );
}

function Connectees({ connections }: Connections) {
  return <h1>{connections}</h1>;
}

export default App;
