export const getUserChats = (userId) => {

  const chatsByUser = {
    '2': [
      {
        id: '2',
        type: 'workgroup',
        name: 'Grupo de trabajo: "Diseño"',
        message: 'Grupo de trabajo actualizado.',
        initials: 'W',
        color: 'bg-green-600'
      },
      {
        id: '3',
        type: 'person',
        name: 'Jessica Evans',
        message: 'Hola, ¿cómo estás?',
        initials: 'JE',
        color: 'bg-purple-500'
      }
    ],
  };

  return chatsByUser[userId] || [];
};