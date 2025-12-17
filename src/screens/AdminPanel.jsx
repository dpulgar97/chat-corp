const AdminPanel = () => {
    
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Panel de Administración</h1>
      <p className="mt-2">Gestión de usuarios (en desarrollo)</p>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
};
export default AdminPanel;

