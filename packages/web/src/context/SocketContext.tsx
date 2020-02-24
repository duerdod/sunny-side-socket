import * as React from 'react';

interface SocketState {
  connections: number;
}

type Action = {
  type: 'UPDATE CONNECTIONS';
  payload: { connections: number };
};

type SocketDispatch = (action: Action) => void;

export const SocketStateContext = React.createContext<SocketState | undefined>(
  undefined
);

export const SocketStateDispatch = React.createContext<
  SocketDispatch | undefined
>(undefined);

const initSocketState = {
  connections: 0
};

function socketReducer(state: SocketState, action: Action): SocketState {
  switch (action.type) {
    case 'UPDATE CONNECTIONS': {
      return {
        connections: action.payload.connections
      };
    }
  }
}

export const SocketProvider: React.FC = ({ children }) => {
  const [socketState, dispatch] = React.useReducer(
    socketReducer,
    initSocketState
  );

  return (
    <SocketStateContext.Provider value={socketState}>
      <SocketStateDispatch.Provider value={dispatch}>
        {children}
      </SocketStateDispatch.Provider>
    </SocketStateContext.Provider>
  );
};

export function useSocketState() {
  const state = React.useContext(SocketStateContext);
  if (!state)
    throw new Error('useSocketState can only be used inside SocketProvider');

  return state;
}

export function useSocketProvider() {
  const dispatch = React.useContext(SocketStateDispatch);
  if (!dispatch)
    throw new Error('useSocketProvider can only be used inside SocketProvider');

  return dispatch;
}
