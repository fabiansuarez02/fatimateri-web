import React from 'react';

export default function ClientDashboard() {
  return (
    <div className="py-20 px-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-teal-800 mb-6">Mi Espacio de Sanación</h1>
      <p className="text-gray-600 mb-12">Bienvenida a tu portal privado. Aquí encontrarás el registro de tus sesiones y proyecciones.</p>
      
      <div className="bg-white shadow p-6 rounded-lg border-t-4 border-teal-500">
        <h2 className="text-xl font-semibold mb-4">Tus Sesiones Recientes</h2>
        <p className="text-gray-500 italic">No tienes documentos disponibles por ahora.</p>
      </div>
    </div>
  );
}
