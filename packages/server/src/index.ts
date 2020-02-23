import * as express from 'express'
import * as http from 'http'
import * as socket from 'socket.io'
import * as path from 'path'
import * as cors from 'cors'

const PORT = 4000
const FILE = path.join(__dirname, '../../web/index.html')

async function startServer() {
    const app = express();
    const server = new http.Server(app);
    const io = socket(server);

    app.use(cors())
    app.get('/', (req, res) => res.sendFile(FILE))

    io.on('connection', socket => {
        console.log('User connected!!!')
        socket.on('submit', (data) => console.log('HELLO:', data))
    })



    server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
}

try {
    startServer()
} catch (e) {
    console.log(e)
}