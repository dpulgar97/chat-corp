// src/components/Sidebar.jsx
import React from "react";

const Sidebar = ({ chats, onSelectChat, selectedChatId }) => {
  return (
    <div className="w-96 bg-white border-r border-gray-200 flex flex-col h-screen">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Buscar o iniciar un nuevo chat"
            className="bg-transparent outline-none flex-1 text-sm"
          />
          <button className="ml-2 p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`flex items-start p-4 cursor-pointer border-b border-gray-100 transition-colors ${
              selectedChatId === chat.id ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full ${chat.color} flex items-center justify-center text-white font-semibold text-sm mr-3`}
            >
              {chat.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-gray-900 truncate">
                  {chat.name}
                </h3>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {chat.date}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">{chat.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
