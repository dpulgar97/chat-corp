import { getUserChats } from '../data/userChats.js';

export const getChats = (req, res) => {
  if (req.user.role !== 'user') {
    return res.json([]); // o un error 403 si prefieres
  }

  const chats = getUserChats(req.user.id);
  res.json(chats);
};