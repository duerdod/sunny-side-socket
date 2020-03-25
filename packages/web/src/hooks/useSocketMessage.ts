import { Message } from 'context/SocketContext';
import { socket } from '../App'


export function useSocketMessage() {
    const sendMessage = (message: string) => socket.emit('NEW_MESSAGE', message)
    const deleteMessage = (message: Message) => socket.emit('DELETE_MESSAGE', message.id)

    return { sendMessage, deleteMessage }

}