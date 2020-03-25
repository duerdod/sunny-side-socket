import { useCallback } from 'react'
import { Message } from 'context/SocketContext';
import { socket } from '../App'


export function useSocketMessage() {
    const sendMessage = useCallback((message: string) => socket.emit('NEW_MESSAGE', message), [])
    const deleteMessage = useCallback((message: Message) => socket.emit('DELETE_MESSAGE', message.id), [])

    return { sendMessage, deleteMessage }

}