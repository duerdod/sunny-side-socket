import * as express from 'express'
import * as http from 'http'
import * as socket from 'socket.io'
import * as dotenv from 'dotenv'
import { log } from './utils/log'

dotenv.config()

const PORT = process.env.PORT || 4000

async function startServer() {
    const app = express();
    const server = new http.Server(app);
    const io: socket.Server = socket(server);

    io.on('connection', socket => {
        log('CONNECTED', Object.keys(io.sockets.sockets).length)
        io.emit('init', { connections: Object.keys(io.sockets.sockets).length })

        socket.on('disconnect', () => {
            log('DISCONNECTED', Object.keys(io.sockets.sockets).length)
            io.emit('destroy', { connections: Object.keys(io.sockets.sockets).length })
        });
    })

    server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
}

try {
    startServer()
} catch (e) {
    console.error(e)
}