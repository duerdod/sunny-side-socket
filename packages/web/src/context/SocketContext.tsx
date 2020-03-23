import * as React from 'react';

interface SocketState {
  // To prevent the 0 flickering. It is actually a number.
  connections: number | string;
  messages: string[];
}

type Action =
  | {
      type: 'UPDATE CONNECTIONS';
      payload: { connections: number };
    }
  | {
      type: 'NEW_MESSAGE';
      payload: { message: string };
    };

type SocketDispatch = (action: Action) => void;

export const SocketStateContext = React.createContext<SocketState | undefined>(
  undefined
);

export const SocketStateDispatch = React.createContext<
  SocketDispatch | undefined
>(undefined);

const initSocketState = {
  connections: '',
  messages: []
};

function socketReducer(state: SocketState, action: Action): SocketState {
  switch (action.type) {
    case 'UPDATE CONNECTIONS': {
      return {
        ...state,
        connections: action.payload.connections
      };
    }
    case 'NEW_MESSAGE': {
      return {
        ...state,
        messages: [action.payload.message, ...state.messages]
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
