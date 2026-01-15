// src/screens/ChatApp.jsx
import React, { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";

const SOCKET_URL = "http://192.168.0.129:3001";

const ChatApp = () => {
  const [chats, setChats] = useState([]); // lista de chats del usuario
  const [selectedChat, setSelectedChat] = useState(null); // chat seleccionado
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Conectar a Socket.IO al montar
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const newSocket = io(SOCKET_URL, {
      auth: { token }
    });

    newSocket.on("connect_error", (err) => {
      console.error("Error de conexión:", err.message);
      alert("No se pudo conectar al chat. Por favor, inicia sesión nuevamente.");
      window.location.href = "/login";
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  // 2. Cargar lista de chats desde el backend
  useEffect(() => {
    if (!socket) return;

    const fetchChats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${SOCKET_URL}/api/chats`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const chatsData = await res.json();
          setChats(chatsData);
          setLoading(false);
        } else if (res.status === 403) {
          // No debería pasar, pero por si acaso
          alert("Acceso denegado al chat");
          window.location.href = "/login";
        }
      } catch (err) {
        console.error("Error al cargar chats:", err);
        setLoading(false);
      }
    };

    fetchChats();
  }, [socket]);

  // 3. Unirse al chat seleccionado y escuchar mensajes
  useEffect(() => {
    if (!socket || !selectedChat) return;

    // Unirse a la sala del chat
    socket.emit("joinChat", selectedChat.id);

    // Manejar mensajes entrantes
    const handleMessage = (message) => {
      if (message.chatId === selectedChat.id) {
        // Actualizar la lista de chats (preview en sidebar)
        const updatedChats = chats.map((chat) => {
          if (chat.id === selectedChat.id) {
            return {
              ...chat,
              messages: [...(chat.messages || []), message],
              message: message.text, // último mensaje para el preview
            };
          }
          return chat;
        });

        setChats(updatedChats);

        // Actualizar el chat seleccionado
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

  // 4. Enviar mensaje
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

  // 5. Renderizado
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-600">Cargando chats...</p>
      </div>
    );
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
};

export default ChatApp;