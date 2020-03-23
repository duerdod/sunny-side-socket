import * as React from 'react'
import { useSocketProvider, useSocketState } from 'context/SocketContext'
import { useSocket } from 'hooks/useSocket';



export function useSocketMessage() {
    const socket = useSocket()
    const dispatch = useSocketProvider();
    const state = useSocketState()

    React.useEffect(() => {
        socket.on('NEW_MESSAGE', (message: string) => dispatch({ type: 'NEW_MESSAGE', payload: { message } }))

        return () => {
            if (socket) {
                socket.disconnect()
            }
        }
    }, [dispatch, socket])


    return { ...state }

}