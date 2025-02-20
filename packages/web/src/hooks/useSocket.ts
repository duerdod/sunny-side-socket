import * as React from 'react'
import io from 'socket.io-client';
import { useSocketProvider, useSocketState, Message } from 'context/SocketContext'
import { isProduction } from 'utils'

interface Connections {
    connections: number;
}

const ENDPOINT = isProduction() ? process.env.REACT_APP_SOCKET_HOST : process.env.REACT_APP_SOCKET_HOST_DEV;
export const socket = io(ENDPOINT as string)

export function useSocket() {
    const dispatch = useSocketProvider()

    const sendMessage = React.useCallback((message: string) => socket.emit('NEW_MESSAGE', message), [])
    const deleteMessage = React.useCallback((id: string) => socket.emit('DELETE_MESSAGE', id), [])

    React.useEffect(() => {
        console.log('render')
        // Init socket events
        socket.on('NEW_MESSAGE', (message: Message) => dispatch({ type: 'NEW_MESSAGE', payload: { message } }))
        socket.on('DELETE_MESSAGE', (id: string) => dispatch({ type: 'DELETE_MESSAGE', payload: { id } }))
        socket.on('INIT', ({ connections }: Connections) => dispatch({ type: 'UPDATE_CONNECTIONS', payload: { connections } }))
        socket.on('DESTROY', ({ connections }: Connections) => dispatch({ type: 'UPDATE_CONNECTIONS', payload: { connections } }))

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { socket, sendMessage, deleteMessage }
}