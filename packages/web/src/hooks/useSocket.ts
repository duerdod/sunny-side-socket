import * as React from 'react'
import io from 'socket.io-client';
import { useSocketProvider, Message } from 'context/SocketContext'
import { isProduction } from 'utils'

interface Connections {
    connections: number;
}

const ENDPOINT = isProduction() ? process.env.REACT_APP_SOCKET_HOST : process.env.REACT_APP_SOCKET_HOST_DEV;
const socket = io(ENDPOINT as string)


export function useSocket() {
    const dispatch = useSocketProvider()

    const emitMessage = React.useCallback((message: string) => socket.emit('NEW_MESSAGE', message), [])

    const updateConnectionCount = React.useCallback((connections: number) =>
        dispatch({ type: 'UPDATE_CONNECTIONS', payload: { connections } }),
        [dispatch])

    React.useEffect(() => {
        // Init socket events
        socket.on('NEW_MESSAGE', (message: Message) => {
            dispatch({ type: 'NEW_MESSAGE', payload: { message } })
        })

        socket.on('init', ({ connections }: Connections) => updateConnectionCount(connections));
        socket.on('destroy', ({ connections }: Connections) => updateConnectionCount(connections));

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };

    }, [dispatch, updateConnectionCount])

    return { socket, emitMessage }
}