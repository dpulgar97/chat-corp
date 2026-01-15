// src/components/UsersView.jsx
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const UsersView = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);

  const token = localStorage.getItem("token");

  // Cargar usuarios
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al cargar usuarios");
      }

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: err.message,
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Acción: eliminar usuario
  const handleDelete = (user) => {
    confirmDialog({
      message: `¿Seguro que deseas eliminar al usuario "${user.username}"?`,
      header: "Confirmar eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          const res = await fetch(`/api/admin/users/${user._id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Error al eliminar usuario");
          }

          // Recargar lista
          fetchUsers();
          toast.current?.show({
            severity: "success",
            summary: "Éxito",
            detail: "Usuario eliminado correctamente",
            life: 3000,
          });
        } catch (err) {
          console.error("Error deleting user:", err);
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: err.message,
            life: 3000,
          });
        }
      },
    });
  };

  // Template para la columna de acciones
  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"
        onClick={() => handleDelete(rowData)}
        aria-label="Eliminar"
      />
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Gestión de Usuarios</h2>

      {/* Notificaciones */}
      <Toast ref={toast} />

      {/* Diálogo de confirmación */}
      <ConfirmDialog />

      {/* Tabla de usuarios */}
      <div className="card">
        <DataTable
          value={users}
          loading={loading}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          tableStyle={{ minWidth: '50rem' }}
          emptyMessage="No se encontraron usuarios."
        >
          <Column field="username" header="Usuario" sortable style={{ width: '30%' }} />
          <Column field="email" header="Email" sortable style={{ width: '40%' }} />
          <Column
            body={actionBodyTemplate}
            header="Acciones"
            style={{ width: '10%' }}
            align="center"
          />
        </DataTable>
      </div>
    </div>
  );
};

export default UsersView;