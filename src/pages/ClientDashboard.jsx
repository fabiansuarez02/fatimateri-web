import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { readItems } from '@directus/sdk';
import { LogOut, User, Calendar, Sparkles, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { directus } from '../lib/directus';

// Mapa de tipos de sesión
const TIPO_SESION = {
  pendulo:       { label: 'Limpieza con Péndulo', color: 'bg-[#BDB2E8]/40 text-[#5a4080]' },
  reiki:         { label: 'Reiki',                color: 'bg-[#cbe3e0]/60 text-[#3a6b67]' },
  complementaria:{ label: 'Terapia Complementaria',color: 'bg-[#f9dfc5]/60 text-[#7a4e2a]' },
};

function SesionCard({ sesion }) {
  const [abierta, setAbierta] = useState(false);
  const tipo = TIPO_SESION[sesion.tipo_sesion] || { label: sesion.tipo_sesion, color: 'bg-gray-100 text-gray-600' };

  const fecha = new Date(sesion.fecha + 'T12:00:00').toLocaleDateString('es-MX', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl overflow-hidden transition-all">
      {/* Cabecera de la sesión */}
      <div className="p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Ícono de fecha */}
          <div className="w-12 h-12 rounded-xl bg-[#f4ebe1] flex flex-col items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-[#8A6BA8] uppercase leading-none">
              {new Date(sesion.fecha + 'T12:00:00').toLocaleString('es-MX', { month: 'short' })}
            </span>
            <span className="text-lg font-bold text-[#2d2d2d] leading-none">
              {new Date(sesion.fecha + 'T12:00:00').getDate()}
            </span>
          </div>

          <div>
            <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-1 ${tipo.color}`}>
              {tipo.label}
            </span>
            <p className="text-xs text-[#6c6c6c] capitalize">{fecha}</p>
            {sesion.observaciones && (
              <p className="text-sm text-[#4B4B4B] mt-1 line-clamp-1">{sesion.observaciones}</p>
            )}
          </div>
        </div>

        {/* Botón expandir reporte */}
        {sesion.reporte && (
          <button
            onClick={() => setAbierta(!abierta)}
            className="shrink-0 flex items-center gap-1 text-xs font-medium text-[#8faaa7] hover:text-[#6a8b87] transition-colors"
          >
            {abierta ? 'Ocultar' : 'Ver reporte'}
            {abierta ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Reporte expandible */}
      {abierta && sesion.reporte && (
        <div className="border-t border-[#e2d4c3]/60 px-5 py-4 bg-white/40">
          <p className="text-xs font-semibold text-[#8A6BA8] uppercase tracking-wide mb-3">
            Reporte de sanación
          </p>
          <div
            className="prose prose-sm max-w-none text-[#4B4B4B]"
            dangerouslySetInnerHTML={{ __html: sesion.reporte }}
          />
        </div>
      )}
    </div>
  );
}

export default function ClientDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sesiones, setSesiones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const displayName = user?.first_name || user?.email?.split('@')[0] || 'Cliente';

  useEffect(() => {
    const cargarSesiones = async () => {
      try {
        const datos = await directus.request(
          readItems('sesiones', {
            sort: ['-fecha'],
            fields: ['id', 'fecha', 'tipo_sesion', 'reporte', 'observaciones', 'status'],
          })
        );
        setSesiones(datos);
      } catch (err) {
        setError('No se pudieron cargar tus sesiones. Intenta recargar la página.');
      } finally {
        setCargando(false);
      }
    };

    cargarSesiones();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Estadísticas
  const totalSesiones = sesiones.length;
  const tiposUnicos = [...new Set(sesiones.map(s => s.tipo_sesion))].length;
  const ultimaSesion = sesiones[0]
    ? new Date(sesiones[0].fecha + 'T12:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'long' })
    : null;

  return (
    <div className="min-h-[80vh] py-16 px-6 bg-gradient-to-br from-[#FDFBF8] to-[#f4ebe1]">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-heading text-[#2d2d2d] mb-1">
              Bienvenida, {displayName}
            </h1>
            <p className="text-[#6c6c6c]">Tu espacio personal de sanación</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#e2d4c3] text-[#4B4B4B] hover:bg-white/70 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" /> Cerrar sesión
          </button>
        </div>

        {/* Perfil */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg rounded-2xl p-5 mb-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#BDB2E8]/30 flex items-center justify-center shrink-0">
            <User className="w-6 h-6 text-[#8A6BA8]" />
          </div>
          <div>
            <p className="font-semibold text-[#2d2d2d]">{user?.first_name} {user?.last_name}</p>
            <p className="text-sm text-[#6c6c6c]">{user?.email}</p>
          </div>
        </div>

        {/* Estadísticas */}
        {!cargando && !error && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-[#8A6BA8]">{totalSesiones}</p>
              <p className="text-xs text-[#6c6c6c] mt-0.5">Sesiones totales</p>
            </div>
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-[#8faaa7]">{tiposUnicos}</p>
              <p className="text-xs text-[#6c6c6c] mt-0.5">Tipos de terapia</p>
            </div>
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl p-4 text-center">
              <p className="text-lg font-bold text-[#c4915a]">{ultimaSesion || '—'}</p>
              <p className="text-xs text-[#6c6c6c] mt-0.5">Última sesión</p>
            </div>
          </div>
        )}

        {/* Lista de sesiones */}
        <div className="mb-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#cbe3e0]/50 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-[#8faaa7]" />
          </div>
          <h2 className="font-semibold text-[#2d2d2d]">Mis Sesiones</h2>
        </div>

        {cargando && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-[#8faaa7]" />
          </div>
        )}

        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {!cargando && !error && sesiones.length === 0 && (
          <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-[#BDB2E8]/20 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7 text-[#BDB2E8]" />
            </div>
            <p className="text-[#4B4B4B] font-medium mb-1">Aún no tienes sesiones registradas</p>
            <p className="text-sm text-[#6c6c6c]">
              Cuando Fátima registre tu primera sesión, aparecerá aquí junto con tu reporte personal.
            </p>
          </div>
        )}

        {!cargando && !error && sesiones.length > 0 && (
          <div className="space-y-3">
            {sesiones.map(sesion => (
              <SesionCard key={sesion.id} sesion={sesion} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
