import * as React from 'react'
import { useSocketProvider, Message } from 'context/SocketContext'

interface Connections {
    connections: number;
}

export function useSocketEmitters(socket: SocketIOClient.Socket) {
    const dispatch = useSocketProvider()

    React.useEffect(() => {
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
}