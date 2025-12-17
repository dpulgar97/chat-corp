import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import ChatApp from './screens/ChatApp';
import AdminPanel from './screens/AdminPanel';


const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const handleLogin = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);

  if (role === "admin") {
    window.location.href = "/admin";
  } else {
    window.location.href = "/";
  }
};

function App() {
  return (
    <Routes>
      <Route 
        path="/login" 
        element={<LoginScreen onLogin={handleLogin} />} 
      />
      
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <ChatApp/>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;