import * as React from 'react'
import io from 'socket.io-client';
import { useSocketProvider, useSocketState, Message } from 'context/SocketContext'
import { isProduction } from 'utils'

interface Connections {
    connections: number;
}

const ENDPOINT = isProduction() ? process.env.REACT_APP_SOCKET_HOST : process.env.REACT_APP_SOCKET_HOST_DEV;
const socket = io(ENDPOINT as string)

export function useSocket() {
    const dispatch = useSocketProvider()

    const emitMessage = React.useCallback((message: string) => socket.emit('NEW_MESSAGE', message), [])
    const deleteMessage = React.useCallback((id: string) => socket.emit('DELETE_MESSAGE', id), [])
    const updateConnectionCount = React.useCallback((connections: number) => dispatch({ type: 'UPDATE_CONNECTIONS', payload: { connections } }), [dispatch])

    React.useEffect(() => {

        console.log('render')
        // Init socket events
        socket.on('NEW_MESSAGE', (message: Message) => console.log(message.id))
        socket.on('DELETE_MESSAGE', (id: string) => dispatch({ type: 'DELETE_MESSAGE', payload: { id } }))
        socket.on('INIT', ({ connections }: Connections) => updateConnectionCount(connections));
        socket.on('DESTROY', ({ connections }: Connections) => updateConnectionCount(connections));

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])

    return { socket, emitMessage, deleteMessage }
}