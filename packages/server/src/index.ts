import * as express from 'express'
import * as http from 'http'
import * as socket from 'socket.io'
import * as dotenv from 'dotenv'
import { generateMessage, handleConnections } from './utils/log'

dotenv.config()

const PORT = process.env.PORT || 4000
const app = express();
const server = new http.Server(app);
const io: socket.Server = socket(server);

io.on('connection', socket => {
    // Socket events.
    io.emit('INIT', { connections: handleConnections(io) })
    socket.on('disconnect', () => io.emit('DESTROY', { connections: handleConnections(io) }))
    socket.on('DELETE_MESSAGE', (id: string) => io.emit('DELETE_MESSAGE', id))
    socket.on('NEW_MESSAGE', (message: string) => io.emit('NEW_MESSAGE', generateMessage(message)))
})


async function startServer() {
    app.get('*', (req: express.Request, res: express.Response) => res.send({ connections: handleConnections(io) }))
    server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
}

try {
    startServer()
} catch (e) {
    console.error(e)
}