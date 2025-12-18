import React, { useState } from "react";

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        onLoginSuccess(data.token, data.user.role);
      } else {
        setError(data.message || "Credenciales inválidas");
      }
    } catch (err) {
      console.log('Error: ', err);
      setError("Error de conexión al servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
      
      <div className="mb-4">
        <label htmlFor="" className="text-[.8rem] text-white mb-1 block font-extralight">
          Nombre de usuario
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600"
          required
        />
      </div>
      
      <div className="mb-8">
        <label htmlFor="" className="text-[.8rem] text-white mb-1 block font-extralight">
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-fit mx-auto block bg-zinc-800 text-white py-3 px-8 cursor-pointer rounded-lg font-medium hover:bg-zinc-900 transition disabled:opacity-50"
      >
        {loading ? "Iniciando sesión..." : "Ingresar"}
      </button>
    </form>
  );
};

export default LoginForm;