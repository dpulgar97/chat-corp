import React from "react";

const AdminSidebar = ({ onSelectItem, selectedItem }) => {
    return (
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col h-screen">
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center">
                        <span className="text-white font-bold">C</span>
                    </div>
                    <h1 className="ml-3 text-lg font-semibold text-gray-800">Panel administrativo</h1>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
                <div
                    onClick={() => onSelectItem("usuarios")}
                    className={`flex items-center p-4 cursor-pointer transition-colors ${selectedItem === "usuarios"
                            ? "bg-blue-50 border-r-2 border-blue-500"
                            : "hover:bg-gray-50"
                        }`}
                >
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-3">
                        U
                    </div>
                    <span className="font-medium text-gray-900">Usuarios</span>
                </div>

                <div
                    onClick={() => onSelectItem("registros")}
                    className={`flex items-center p-4 cursor-pointer transition-colors ${selectedItem === "registros"
                            ? "bg-blue-50 border-r-2 border-blue-500"
                            : "hover:bg-gray-50"
                        }`}
                >
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold mr-3">
                        R
                    </div>
                    <span className="font-medium text-gray-900">Registros</span>
                </div>
            </div>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={() => onSelectItem("logout")}
                    className="w-full flex items-center p-2 text-gray-900 cursor-pointer hover:bg-red-500 hover:text-white rounded-md transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
                    <span>Cerrar sesión</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;