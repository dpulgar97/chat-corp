// const AdminPanel = () => {
    
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     window.location.href = "/login";
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold">Panel de Administración</h1>
//       <p className="mt-2">Gestión de usuarios (en desarrollo)</p>
//       <button
//         onClick={handleLogout}
//         className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
//       >
//         Cerrar sesión
//       </button>
//     </div>
//   );
// };
// export default AdminPanel;

import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import UsersView from "../components/UsersView";

const RegistrosView = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-800">Registros del sistema</h2>
    <p className="mt-4 text-gray-600">Próximamente...</p>
  </div>
);

const AdminPanel = () => {
  const [selectedItem, setSelectedItem] = useState("usuarios");

  const handleSelect = (item) => {
    if (item === "logout") {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }
    setSelectedItem(item);
  };

  const renderContent = () => {
    switch (selectedItem) {
      case "usuarios":
        return <UsersView />;
      case "registros":
        return <RegistrosView />;
      default:
        return <UsersView />;
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar onSelectItem={handleSelect} selectedItem={selectedItem} />
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel;