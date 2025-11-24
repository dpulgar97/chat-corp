import { verifyToken } from '../utils/token.js';

export const setupSocket = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error('Token no proporcionado'));
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return next(new Error('Token inválido'));
    }

    socket.user = decoded;
    next();
  });

  io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.user.email);
    socket.join('general');

    socket.on('sendMessage', (messageText) => {
      if (!messageText || typeof messageText !== 'string') return;

      const message = {
        id: Date.now().toString(),
        text: messageText.trim(),
        senderId: socket.user.id,
        senderEmail: socket.user.email,
        timestamp: new Date().toISOString()
      };

      io.to('general').emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('Usuario desconectado:', socket.user?.email);
    });
  });
};