import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { readItems } from '@directus/sdk';
import {
  LogOut, User, Calendar, Sparkles, ChevronDown, ChevronUp,
  Loader2, Quote, Clock, CheckCircle, AlertCircle, Send, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { directus, directusUrl } from '../lib/directus';

// ─── Mapas ────────────────────────────────────────────────────────────────────
const TIPO_SESION = {
  pendulo:        { label: 'Limpieza con Péndulo',   color: 'bg-[#BDB2E8]/40 text-[#5a4080]' },
  reiki:          { label: 'Reiki',                   color: 'bg-[#cbe3e0]/60 text-[#3a6b67]' },
  complementaria: { label: 'Terapia Complementaria',  color: 'bg-[#f9dfc5]/60 text-[#7a4e2a]' },
};

const TESTIMONIO_STATUS = {
  pending:  { label: 'Pendiente de revisión', color: 'bg-yellow-50 text-yellow-700 border-yellow-200',  icon: Clock },
  approved: { label: 'Publicado',             color: 'bg-green-50 text-green-700 border-green-200',     icon: CheckCircle },
  rejected: { label: 'No aprobado',           color: 'bg-red-50 text-red-700 border-red-200',           icon: AlertCircle },
};

const SERVICIOS_TESTIMONIO = [
  { value: 'pendulo',        label: 'Limpieza con Péndulo' },
  { value: 'reiki',          label: 'Reiki' },
  { value: 'complementaria', label: 'Terapia Complementaria' },
  { value: 'espacio',        label: 'Limpieza de Espacio' },
  { value: 'animales',       label: 'Terapia para Animales' },
  { value: 'curso',          label: 'Curso / Taller' },
  { value: 'otro',           label: 'Otro' },
];

// ─── SesionCard ───────────────────────────────────────────────────────────────
function SesionCard({ sesion }) {
  const [abierta, setAbierta] = useState(false);
  const tipo = TIPO_SESION[sesion.tipo_sesion] || { label: sesion.tipo_sesion, color: 'bg-gray-100 text-gray-600' };
  const fecha = new Date(sesion.fecha + 'T12:00:00').toLocaleDateString('es-MX', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl overflow-hidden transition-all">
      <div className="p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
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
      {abierta && sesion.reporte && (
        <div className="border-t border-[#e2d4c3]/60 px-5 py-4 bg-white/40">
          <p className="text-xs font-semibold text-[#8A6BA8] uppercase tracking-wide mb-3">Reporte de sanación</p>
          <div className="prose prose-sm max-w-none text-[#4B4B4B]" dangerouslySetInnerHTML={{ __html: sesion.reporte }} />
        </div>
      )}
    </div>
  );
}

// ─── Formulario de testimonio (inline) ───────────────────────────────────────
function TestimonioForm({ user, onEnviado, onCancel }) {
  const [form, setForm] = useState({
    nombre_publico: user?.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : '',
    servicio: '',
    comentario: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`${directusUrl}/items/testimonios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ ...form, cliente: user.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.errors?.[0]?.message || 'Error al enviar.');
      onEnviado();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-[#BDB2E8]/40 shadow-sm rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#2d2d2d]">Nuevo testimonio</h3>
        <button onClick={onCancel} className="text-[#9e9e9e] hover:text-[#4B4B4B] transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-[#4B4B4B] mb-1">Nombre o alias público</label>
          <input
            name="nombre_publico" type="text" required value={form.nombre_publico}
            onChange={handleChange} placeholder="Ej: Laura S."
            className="w-full px-3 py-2 border border-[#e2d4c3] rounded-xl text-sm focus:ring-2 focus:ring-[#8A6BA8] focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#4B4B4B] mb-1">Servicio recibido</label>
          <select
            name="servicio" value={form.servicio} onChange={handleChange}
            className="w-full px-3 py-2 border border-[#e2d4c3] rounded-xl text-sm focus:ring-2 focus:ring-[#8A6BA8] focus:border-transparent outline-none bg-white"
          >
            <option value="">Seleccioná...</option>
            {SERVICIOS_TESTIMONIO.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-[#4B4B4B] mb-1">Tu experiencia</label>
          <textarea
            name="comentario" required value={form.comentario} onChange={handleChange}
            rows={3} placeholder="Contanos cómo fue tu experiencia..."
            className="w-full px-3 py-2 border border-[#e2d4c3] rounded-xl text-sm focus:ring-2 focus:ring-[#8A6BA8] focus:border-transparent outline-none resize-none"
          />
        </div>
        {error && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{error}</p>}
        <div className="flex gap-2 pt-1">
          <button
            type="button" onClick={onCancel}
            className="flex-1 py-2 rounded-xl border border-[#e2d4c3] text-[#4B4B4B] text-sm hover:bg-gray-50 transition-colors"
          >Cancelar</button>
          <button
            type="submit" disabled={loading}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#8A6BA8] hover:bg-[#7558a0] text-white text-sm font-semibold transition-all disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Dashboard principal ──────────────────────────────────────────────────────
export default function ClientDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [sesiones, setSesiones]           = useState([]);
  const [cargando, setCargando]           = useState(true);
  const [error, setError]                 = useState('');

  const [testimonios, setTestimonios]     = useState([]);
  const [cargandoTest, setCargandoTest]   = useState(true);
  const [mostrarForm, setMostrarForm]     = useState(false);
  const [testimonioEnviado, setTestimonioEnviado] = useState(false);

  const displayName = user?.first_name || user?.email?.split('@')[0] || 'Cliente';

  // Cargar sesiones
  useEffect(() => {
    directus.request(
      readItems('sesiones', { sort: ['-fecha'], fields: ['id','fecha','tipo_sesion','reporte','observaciones','status'] })
    )
      .then(datos => setSesiones(datos))
      .catch(() => setError('No se pudieron cargar tus sesiones. Intenta recargar la página.'))
      .finally(() => setCargando(false));
  }, []);

  // Cargar testimonios propios
  const cargarTestimonios = () => {
    const token = localStorage.getItem('auth_token');
    fetch(`${directusUrl}/items/testimonios?fields=id,nombre_publico,servicio,comentario,status,date_created&sort=-date_created`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(r => r.json())
      .then(data => setTestimonios(data.data || []))
      .catch(() => {})
      .finally(() => setCargandoTest(false));
  };

  useEffect(() => { cargarTestimonios(); }, []);

  const handleLogout = async () => { await logout(); navigate('/'); };

  const handleTestimonioEnviado = () => {
    setMostrarForm(false);
    setTestimonioEnviado(true);
    cargarTestimonios();
    setTimeout(() => setTestimonioEnviado(false), 5000);
  };

  // Estadísticas
  const totalSesiones = sesiones.length;
  const tiposUnicos   = [...new Set(sesiones.map(s => s.tipo_sesion))].length;
  const ultimaSesion  = sesiones[0]
    ? new Date(sesiones[0].fecha + 'T12:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'long' })
    : null;

  // ¿Ya tiene un testimonio pendiente o aprobado? (para no enviar duplicados)
  const yaEnvioTestimonio = testimonios.some(t => t.status === 'pending' || t.status === 'approved');

  return (
    <div className="min-h-[80vh] py-16 px-6 bg-gradient-to-br from-[#FDFBF8] to-[#f4ebe1]">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-heading text-[#2d2d2d] mb-1">Bienvenida, {displayName}</h1>
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

        {/* ── Mis Sesiones ── */}
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
          <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
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
            {sesiones.map(sesion => <SesionCard key={sesion.id} sesion={sesion} />)}
          </div>
        )}

        {/* ── Mis Testimonios ── */}
        <div className="mt-10 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#BDB2E8]/30 flex items-center justify-center">
              <Quote className="w-4 h-4 text-[#8A6BA8]" />
            </div>
            <h2 className="font-semibold text-[#2d2d2d]">Mis Testimonios</h2>
          </div>
          {!mostrarForm && !yaEnvioTestimonio && (
            <button
              onClick={() => setMostrarForm(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A6BA8] hover:text-[#6a4f8a] border border-[#BDB2E8]/60 rounded-full px-3 py-1.5 hover:bg-[#BDB2E8]/10 transition-colors"
            >
              <Quote className="w-3.5 h-3.5" /> Compartir experiencia
            </button>
          )}
        </div>

        {/* Aviso de testimonio enviado */}
        {testimonioEnviado && (
          <div className="mb-3 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
            <CheckCircle className="w-4 h-4 shrink-0" />
            ¡Gracias! Tu testimonio fue enviado y será revisado antes de publicarse.
          </div>
        )}

        {/* Formulario inline */}
        {mostrarForm && (
          <div className="mb-3">
            <TestimonioForm
              user={user}
              onEnviado={handleTestimonioEnviado}
              onCancel={() => setMostrarForm(false)}
            />
          </div>
        )}

        {/* Lista de testimonios propios */}
        {cargandoTest && (
          <div className="flex justify-center py-6">
            <Loader2 className="w-5 h-5 animate-spin text-[#8A6BA8]" />
          </div>
        )}

        {!cargandoTest && testimonios.length === 0 && !mostrarForm && (
          <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl p-6 text-center">
            <p className="text-[#4B4B4B] text-sm font-medium mb-1">Todavía no compartiste ningún testimonio</p>
            <p className="text-xs text-[#6c6c6c]">Si ya tuviste una sesión, contanos tu experiencia.</p>
            <button
              onClick={() => setMostrarForm(true)}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A6BA8] hover:underline"
            >
              <Quote className="w-3.5 h-3.5" /> Compartir ahora
            </button>
          </div>
        )}

        {!cargandoTest && testimonios.length > 0 && (
          <div className="space-y-3">
            {testimonios.map(t => {
              const st = TESTIMONIO_STATUS[t.status] || TESTIMONIO_STATUS.pending;
              const StatusIcon = st.icon;
              const servicioLabel = SERVICIOS_TESTIMONIO.find(s => s.value === t.servicio)?.label;
              return (
                <div key={t.id} className={`bg-white/70 backdrop-blur-xl border rounded-2xl p-5 ${t.status === 'approved' ? 'border-green-200/60' : t.status === 'rejected' ? 'border-red-200/60' : 'border-white/40'}`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="text-sm text-[#4B4B4B] italic flex-1">"{t.comentario}"</p>
                    <span className={`shrink-0 inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${st.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {st.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#9e9e9e]">
                    <span>{t.nombre_publico}</span>
                    {servicioLabel && <span>· {servicioLabel}</span>}
                    {t.status === 'rejected' && (
                      <span className="text-red-500">· No cumple con las pautas de publicación</span>
                    )}
                  </div>
                </div>
              );
            })}
            {/* Si todos fueron rechazados, puede enviar otro */}
            {!mostrarForm && testimonios.every(t => t.status === 'rejected') && (
              <button
                onClick={() => setMostrarForm(true)}
                className="text-xs font-semibold text-[#8A6BA8] hover:underline"
              >
                + Enviar un nuevo testimonio
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
