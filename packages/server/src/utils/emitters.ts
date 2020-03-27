import * as uuid from 'uuid';

// TODO: Type this.
export const handleConnections = (io: any) => Object.keys(io.sockets.sockets).length;

export const forward = (input: any) => input

// I'd like shared types.
export function generateMessage(message: any) {
    const { width, height, text } = message
    return {
        id: uuid.v4(),
        text,
        initialPosition: {
            x: Math.floor(Math.random() * Math.floor(width - 100)),
            y: Math.floor(Math.random() * Math.floor(height - 100))
        }
    }
}
