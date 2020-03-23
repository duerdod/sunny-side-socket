import { useSocketState } from 'context/SocketContext';



export function useSocketMessage() {
    const state = useSocketState()

    return { ...state }

}