import * as express from 'express'
import * as http from 'http'
import * as socket from 'socket.io'
import * as path from 'path'

const PORT = 4000
const WEB_ROOT = path.join(__dirname, '../../web')

function log(type: string) {
    const today = new Date()
    const seconds = today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds()
    const minutes = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes()
    const hours = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours()
    console.log(`${hours}:${minutes}:${seconds}, ${type}`)
}

async function startServer() {
    const app = express();
    const server = new http.Server(app);
    const io = socket(server);
    let connections = 0;

    app.use(express.static(path.join(WEB_ROOT, 'build')));
    app.get('/', (_, res) => res.sendFile(WEB_ROOT))

    io.on('connection', socket => {
        log('CONNECTED')
        connections++
        io.emit('init', { connections })

        socket.on('disconnect', () => {
            log('DISCONNECTED')
            connections--
            io.emit('destroy', { connections })
        });
    })

    server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
}

try {
    startServer()
} catch (e) {
    console.error(e)
}