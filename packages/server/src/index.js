"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const socket = require("socket.io");
const path = require("path");
const dotenv = require("dotenv");
const log_1 = require("./utils/log");
dotenv.config();
const PORT = process.env.PORT || 4000;
const WEB_ROOT = path.join(__dirname, '../../web');
const ENV = 'production';
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express();
        const server = new http.Server(app);
        const io = socket(server);
        let connections = 0;
        if (process.env.NODE_ENV === ENV) {
            app.use(express.static(path.join(WEB_ROOT, 'build')));
        }
        app.get('/', (_, res) => res.sendFile(WEB_ROOT));
        io.on('connection', socket => {
            log_1.log('CONNECTED');
            connections++;
            io.emit('init', { connections });
            socket.on('disconnect', () => {
                log_1.log('DISCONNECTED');
                connections--;
                io.emit('destroy', { connections });
            });
        });
        server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
    });
}
try {
    startServer();
}
catch (e) {
    console.error(e);
}
//# sourceMappingURL=index.js.map