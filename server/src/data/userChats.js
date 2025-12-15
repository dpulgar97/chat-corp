// server/data/userChats.js
export const getUserChats = (userId) => {
  // Simulación: qué chats ve cada usuario
  const chatsByUser = {
    '1': [ // admin
      {
        id: '1',
        type: 'project',
        name: 'Conferencia',
        initials: 'P',
        color: 'bg-green-500'
      },
      {
        id: '2',
        type: 'workgroup',
        name: 'Grupo de trabajo: "Diseño"',
        initials: 'W',
        color: 'bg-green-600'
      }
    ],
    '2': [ // user1
      {
        id: '2',
        type: 'workgroup',
        name: 'Grupo de trabajo: "Diseño"',
        initials: 'W',
        color: 'bg-green-600'
      },
      {
        id: '3',
        type: 'person',
        name: 'Jessica Evans',
        initials: 'JE',
        color: 'bg-purple-500'
      }
    ]
  };

  return chatsByUser[userId] || [];
};