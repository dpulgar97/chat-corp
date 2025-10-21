// src/App.jsx
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatContainer from "./components/ChatContainer";
import "./App.css";

const initialChatsData = [
  {
    id: 1,
    type: "project",
    name: 'Project: "Conference"',
    message: 'Project "Conference" is no longer linked to this chat.',
    date: "Apr 11",
    initials: "P",
    color: "bg-green-500",
    messages: [
      {
        id: 1,
        text: "Hola, ¿cómo va el proyecto?",
        sender: "Tú",
        time: "10:30 AM",
      },
      {
        id: 2,
        text: "Bien, ya terminamos la presentación.",
        sender: "Alex",
        time: "10:32 AM",
      },
    ],
  },
  {
    id: 2,
    type: "workgroup",
    name: 'Workgroup: "Design"',
    message: 'Workgroup "Design" is no longer linked to this chat.',
    date: "Apr 10",
    initials: "W",
    color: "bg-green-600",
    messages: [
      {
        id: 1,
        text: "¿Alguien revisó los mockups?",
        sender: "Lucía",
        time: "9:15 AM",
      },
      {
        id: 2,
        text: "Sí, están listos en Figma.",
        sender: "Tú",
        time: "9:20 AM",
      },
    ],
  },
  {
    id: 3,
    type: "person",
    name: "Jessica Evans",
    message: "The document Employment contract has been signed.",
    date: "Apr 3",
    initials: "JE",
    color: "bg-purple-500",
    messages: [
      {
        id: 1,
        text: "¡Felicidades por el nuevo rol!",
        sender: "Tú",
        time: "2:00 PM",
      },
      { id: 2, text: "Gracias 😊", sender: "Jessica", time: "2:02 PM" },
    ],
  },
];

function App() {
  const [chats, setChats] = useState(initialChatsData);
  const [selectedChat, setSelectedChat] = useState(null);

  const sendMessage = (text) => {
    if (!selectedChat || !text.trim()) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessage = {
      id: Date.now(), // ID único simple
      text: text.trim(),
      sender: "Tú",
      time: timeString,
    };

    // Actualizar el chat seleccionado con el nuevo mensaje
    const updatedChats = chats.map((chat) => {
      if (chat.id === selectedChat.id) {
        const updatedMessages = [...chat.messages, newMessage];
        // Actualizar el "preview message" del chat en la sidebar
        const lastMessage = newMessage.text;
        return {
          ...chat,
          message: lastMessage,
          messages: updatedMessages,
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setSelectedChat((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      message: newMessage.text, // actualiza preview
    }));
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        chats={chats}
        onSelectChat={setSelectedChat}
        selectedChatId={selectedChat?.id}
      />
      <ChatContainer chat={selectedChat} onSendMessage={sendMessage} />
    </div>
  );
}

export default App;
