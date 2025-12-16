// src/App.jsx
import React, { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import Sidebar from "./components/Sidebar";
import ChatContainer from "./components/ChatContainer";
import "./App.css";

const SOCKET_URL = "http://localhost:3001";

function App() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar rol y redirigir si es admin
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      // Redirigir a panel de administración (puedes crear esta ruta luego)
      window.location.href = "/admin"; // o "/admin-dashboard"
      return;
    }

    if (!role || role !== "user") {
      // Si no hay rol válido, redirigir al login
      window.location.href = "/login";
      return;
    }

    // Si es user, continuar
    setLoading(false);
  }, []);

  // Inicializar Socket.IO
  useEffect(() => {
    if (loading) return;

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const newSocket = io(SOCKET_URL, {
      auth: { token }
    });

    newSocket.on("connect_error", (err) => {
      console.error("Error de conexión a chat:", err.message);
      alert("No se pudo conectar al chat. Por favor, inicia sesión nuevamente.");
      window.location.href = "/login";
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [loading]);

  // Cargar chats del backend
  useEffect(() => {
    if (loading) return;

    const fetchChats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${SOCKET_URL}/api/chats`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const chatsData = await res.json();
          setChats(chatsData);
        } else {
          console.error("Error al cargar chats:", await res.text());
        }
      } catch (err) {
        console.error("Error de red:", err);
      }
    };

    fetchChats();
  }, [loading]);

  // Unirse al chat seleccionado y escuchar mensajes
  useEffect(() => {
    if (!socket || !selectedChat) return;

    // Unirse a la sala del chat
    socket.emit("joinChat", selectedChat.id);

    // Escuchar mensajes de este chat
    const handleMessage = (message) => {
      if (message.chatId === selectedChat.id) {
        // Actualizar chats en el estado
        const updatedChats = chats.map((chat) => {
          if (chat.id === selectedChat.id) {
            return {
              ...chat,
              messages: [...(chat.messages || []), message],
              message: message.text, // preview en sidebar
            };
          }
          return chat;
        });

        setChats(updatedChats);
        setSelectedChat((prev) => ({
          ...prev,
          messages: [...(prev?.messages || []), message],
          message: message.text,
        }));
      }
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [socket, selectedChat, chats]);

  const sendMessage = useCallback(
    (text) => {
      if (!socket || !selectedChat || !text.trim()) return;

      socket.emit("sendMessage", {
        chatId: selectedChat.id,
        text: text.trim(),
      });
    },
    [socket, selectedChat]
  );

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

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