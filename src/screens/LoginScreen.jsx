// src/screens/LoginScreen.jsx
import React from "react";
import LoginForm from "../components/LoginForm";

const LoginScreen = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Bienvenido</h1>
          <p className="text-gray-600 mt-2">Inicia sesión para continuar</p>
        </div>
        
        <LoginForm onLoginSuccess={onLogin} />
      </div>
    </div>
  );
};

export default LoginScreen;