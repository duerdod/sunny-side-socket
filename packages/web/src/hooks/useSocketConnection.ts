import * as React from 'react'
import { useSocketProvider, useSocketState } from 'context/SocketContext'
import { useSocket } from './useSocket';


interface Connections {
    connections: number;
}

export function useSocketConnection() {
    const socket = useSocket()
    const dispatch = useSocketProvider()
    const state = useSocketState();

    React.useEffect(() => {
        socket.on('init', ({ connections }: Connections) => {
            dispatch({ type: 'UPDATE CONNECTIONS', payload: { connections } });
        });

        socket.on('destroy', ({ connections }: Connections) => {
            dispatch({ type: 'UPDATE CONNECTIONS', payload: { connections } });
        });
        // eslint-disable-next-line
    }, []);

    return { ...state }

}