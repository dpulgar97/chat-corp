// server/app.js
import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import connectDB from './config/db.js';
import { Server } from 'socket.io';
import { setupSocket } from './socket/socket.js';

import authRoutes from './routes/auth.routes.js';
import testRoutes from './routes/test.routes.js';
import chatRoutes from './routes/chat.route.js';

connectDB();

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({
  origin: ["http://localhost:5173", "http://192.168.68.105:5173/"],
  credentials: true
}));

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Backend con MongoDB y Socket.IO');
});
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/chats', chatRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://192.168.68.105:5173/"],
    credentials: true
  }
});

setupSocket(io)

server.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});