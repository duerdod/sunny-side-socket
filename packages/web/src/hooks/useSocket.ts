import * as React from 'react'
import io from 'socket.io-client';
import { useSocketProvider, useSocketState } from '../context/SocketContext'
import { isProduction } from '../utils'
interface Connections {
    connections: number;
}

const ENDPOINT = isProduction() ? process.env.REACT_APP_SOCKET_HOST : process.env.REACT_APP_SOCKET_HOST_DEV;
const socket = io(ENDPOINT as string);

export function useSocket() {
    const dispatch = useSocketProvider()
    const state = useSocketState();

    React.useEffect(() => {
        socket.on('init', ({ connections }: Connections) => {
            dispatch({ type: 'UPDATE CONNECTIONS', payload: { connections } });
        });

        socket.on('destroy', ({ connections }: Connections) => {
            dispatch({ type: 'UPDATE CONNECTIONS', payload: { connections } });
        });

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
        // eslint-disable-next-line
    }, []);

    return state

}