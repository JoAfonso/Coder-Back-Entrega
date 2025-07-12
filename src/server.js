import app from './app.js';
import { Server } from 'socket.io';
import http from 'http';

const PORT = 8080;
const server = http.createServer(app);
const io = new Server(server);

// Variável exportável para manipular no controller
export const socketServer = io;

io.on('connection', (socket) => {
  console.log('Novo cliente conectado');
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
