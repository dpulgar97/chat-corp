// src/screens/LoginScreen.jsx
import React from "react";
import LoginForm from "../components/LoginForm";

const LoginScreen = ({ onLogin }) => {
  return (
    <div className="bg-main-login flex items-center justify-center min-h-screen p-4">
      <div className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-md w-full max-w-md">
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
