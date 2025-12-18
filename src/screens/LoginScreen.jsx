// src/screens/LoginScreen.jsx
import React from "react";
import LoginForm from "../components/LoginForm";
import Logo from "../assets/images/Logo.webp"

const LoginScreen = ({ onLogin }) => {
  return (
    <div className="bg-main-login flex items-center justify-center min-h-dvh p-4">
      <div className="p-12 rounded-2xl w-full max-w-96">
        <div className="text-center mb-6">
          <img src={Logo} alt="Logo" className="mx-auto w-28 h-auto"/>
          <h1 className="text-2xl mt-4 text-white font-bold tracking-wide text-shadow-md md:text-3xl">Bienvenido/a</h1>
          <p className="text-white text-[.9rem] font-extralight mt-2 text-shadow-md">Ingrese sus datos para iniciar sesión</p>
        </div>
        <LoginForm onLoginSuccess={onLogin} />
      </div>
    </div>
  );
};

export default LoginScreen;
