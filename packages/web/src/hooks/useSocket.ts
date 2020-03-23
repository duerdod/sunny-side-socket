import * as React from 'react'
import io from 'socket.io-client';
import { isProduction } from 'utils'

const ENDPOINT = isProduction() ? process.env.REACT_APP_SOCKET_HOST : process.env.REACT_APP_SOCKET_HOST_DEV;
const socket = io(ENDPOINT as string)

export function useSocket() {
    React.useEffect(() => {
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [])

    return socket
}