import * as uuid from 'uuid';

export function log(type: string, connections?: number) {
    const today = new Date()
    const seconds = today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds()
    const minutes = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes()
    const hours = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours()
    console.log(`${hours}:${minutes}:${seconds}, USER ${type}, current connections: ${connections}`)
}

// TODO: Type this.
export function handleConnections(io: any) {
    return Object.keys(io.sockets.sockets).length
}

export function generateMessage(text: string) {
    return {
        id: uuid.v4(),
        text,
        initialPosition: {
            x: Math.floor(Math.random() * Math.floor(1000)),
            y: Math.floor(Math.random() * Math.floor(1000))
        }
    }
}
