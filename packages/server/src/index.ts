import * as express from 'express'
import * as http from 'http'
import * as socket from 'socket.io'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { log } from './utils/log'

dotenv.config()

const PORT = process.env.PORT || 4000
const WEB_ROOT = path.join(__dirname, '../../web')
const ENV = 'production'

async function startServer() {
    const app = express();
    const server = new http.Server(app);
    const io = socket(server);
    let connections = 0;

    if (process.env.NODE_ENV === ENV) {
        app.use(express.static(path.join(WEB_ROOT, 'build')));
    }
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