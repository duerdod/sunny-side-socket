import * as React from 'react';

export interface Message {
  id: string;
  text: string;
  initialPosition: {
    x: number;
    y: number;
    zIndex: number;
  };
}

interface SocketState {
  // To prevent the 0 flickering. It is actually a number.
  connections: number | string;
  messages: Message[];
}

type Action =
  | {
      type: 'UPDATE_CONNECTIONS';
      payload: { connections: number };
    }
  | {
      type: 'NEW_MESSAGE';
      payload: { message: Message };
    }
  | {
      type: 'DELETE_MESSAGE';
      payload: { id: string };
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
    case 'UPDATE_CONNECTIONS': {
      return {
        ...state,
        connections: action.payload.connections
      };
    }

    case 'NEW_MESSAGE': {
      const { message } = action.payload;
      return {
        ...state,
        messages: [
          {
            ...message,
            initialPosition: {
              ...message.initialPosition,
              zIndex: state.messages.length
            }
          },
          ...state.messages
        ]
      };
    }

    case 'DELETE_MESSAGE':
      const messages = state.messages.filter(m => action.payload.id !== m.id);
      return {
        ...state,
        messages
      };
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
