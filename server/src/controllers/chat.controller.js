import { getUserChats } from '../data/userChats.js';

export const getChats = (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  const chats = getUserChats(req.user.id);
  res.json(chats);
};