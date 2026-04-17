import React, { useEffect, useState } from 'react';
import { Quote, Star, Loader2, CheckCircle, X, Send, Sparkles } from 'lucide-react';
import { directusUrl } from '../lib/directus';
import { useAuth } from '../context/AuthContext';

const SERVICIOS = [
  { value: 'pendulo',       label: 'Limpieza con Péndulo' },
  { value: 'reiki',         label: 'Reiki' },
  { value: 'complementaria',label: 'Terapia Complementaria' },
  { value: 'espacio',       label: 'Limpieza de Espacio' },
  { value: 'animales',      label: 'Terapia para Animales' },
  { value: 'curso',         label: 'Curso / Taller' },
  { value: 'otro',          label: 'Otro' },
];

const SERVICIO_COLORS = {
  pendulo:        'bg-[#BDB2E8]/40 text-[#5a4080]',
  reiki:          'bg-[#cbe3e0]/60 text-[#3a6b67]',
  complementaria: 'bg-[#f9dfc5]/60 text-[#7a4e2a]',
  espacio:        'bg-[#d4ecd4]/60 text-[#2d6a2d]',
  animales:       'bg-[#fde8f0]/60 text-[#8a3a5a]',
  curso:          'bg-[#e0ecf9]/60 text-[#2a4a7a]',
  otro:           'bg-gray-100 text-gray-600',
};

// ─── Modal de envío de testimonio ───────────────────────────────────────────
function TestimonioModal({ user, onClose, onEnviado }) {
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
      const token = localStorage.getItem('directus_token');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8A6BA8] to-[#6a4f8a] rounded-t-3xl px-6 py-5 flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-lg font-heading">Compartí tu experiencia</h3>
            <p className="text-[#e8e0f5] text-sm mt-0.5">Tu testimonio será revisado antes de publicarse</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nombre público */}
          <div>
            <label className="block text-sm font-medium text-[#4B4B4B] mb-1.5">
              Nombre o alias que se mostrará públicamente
            </label>
            <input
              name="nombre_publico"
              type="text"
              required
              value={form.nombre_publico}
              onChange={handleChange}
              placeholder="Ej: Laura S., Ana de Buenos Aires..."
              className="w-full px-4 py-2.5 border border-[#e2d4c3] rounded-xl text-sm focus:ring-2 focus:ring-[#8A6BA8] focus:border-transparent outline-none"
            />
          </div>

          {/* Servicio */}
          <div>
            <label className="block text-sm font-medium text-[#4B4B4B] mb-1.5">
              Servicio recibido
            </label>
            <select
              name="servicio"
              value={form.servicio}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-[#e2d4c3] rounded-xl text-sm focus:ring-2 focus:ring-[#8A6BA8] focus:border-transparent outline-none bg-white"
            >
              <option value="">Seleccioná un servicio...</option>
              {SERVICIOS.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Comentario */}
          <div>
            <label className="block text-sm font-medium text-[#4B4B4B] mb-1.5">
              Tu experiencia
            </label>
            <textarea
              name="comentario"
              required
              value={form.comentario}
              onChange={handleChange}
              rows={4}
              placeholder="Contanos cómo fue tu experiencia con Fátima..."
              className="w-full px-4 py-2.5 border border-[#e2d4c3] rounded-xl text-sm focus:ring-2 focus:ring-[#8A6BA8] focus:border-transparent outline-none resize-none"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">{error}</p>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-[#e2d4c3] text-[#4B4B4B] text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#8A6BA8] hover:bg-[#7558a0] text-white text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {loading ? 'Enviando...' : 'Enviar testimonio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Card de testimonio ──────────────────────────────────────────────────────
function TestimonioCard({ testimonio }) {
  const servicioLabel = SERVICIOS.find(s => s.value === testimonio.servicio)?.label;
  const colorClass = SERVICIO_COLORS[testimonio.servicio] || SERVICIO_COLORS.otro;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 flex flex-col gap-4 transition-all hover:shadow-md">
      <Quote className="w-7 h-7 text-[#BDB2E8] shrink-0" />
      <p className="text-[#4B4B4B] italic leading-relaxed flex-1">"{testimonio.comentario}"</p>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1">
          {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-[#f0c040] text-[#f0c040]" />)}
        </div>
        <div className="text-right">
          <p className="font-semibold text-[#8A6BA8] text-sm">— {testimonio.nombre_publico}</p>
          {servicioLabel && (
            <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${colorClass}`}>
              {servicioLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Componente principal ────────────────────────────────────────────────────
const Testimonials = () => {
  const { user } = useAuth();
  const [testimonios, setTestimonios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const cargar = () => {
    fetch(`${directusUrl}/items/testimonios?filter[status][_eq]=approved&sort=-date_created&fields=id,nombre_publico,servicio,comentario,date_created`)
      .then(r => r.json())
      .then(data => setTestimonios(data.data || []))
      .catch(() => {})
      .finally(() => setCargando(false));
  };

  useEffect(() => { cargar(); }, []);

  const handleEnviado = () => {
    setShowModal(false);
    setEnviado(true);
    setTimeout(() => setEnviado(false), 6000);
  };

  return (
    <>
      <section id="testimonios" className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-heading font-heading">
              Historias de Transformación
            </h2>
            <p className="mt-4 text-[#4B4B4B] max-w-2xl mx-auto">
              La mayor recompensa es ver el bienestar en la vida de quienes acompaño.
              Aquí comparto algunas de sus experiencias.
            </p>
          </div>

          {cargando && (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-[#8faaa7]" />
            </div>
          )}

          {!cargando && testimonios.length === 0 && (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-full bg-[#BDB2E8]/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-[#BDB2E8]" />
              </div>
              <p className="text-[#4B4B4B] font-medium">Los primeros testimonios pronto estarán aquí</p>
            </div>
          )}

          {!cargando && testimonios.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {testimonios.map(t => <TestimonioCard key={t.id} testimonio={t} />)}
            </div>
          )}

          {/* CTA para usuarios registrados */}
          {user && (
            <div className="mt-10 text-center">
              {enviado ? (
                <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  ¡Gracias! Tu testimonio fue enviado y será revisado antes de publicarse.
                </div>
              ) : (
                <div className="inline-flex flex-col items-center gap-3">
                  <p className="text-sm text-[#6c6c6c]">¿Ya viviste una sesión con Fátima?</p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center gap-2 bg-[#8A6BA8] hover:bg-[#7558a0] text-white font-semibold text-sm px-6 py-3 rounded-full shadow-md shadow-[#8A6BA8]/20 transition-all hover:scale-105 active:scale-95"
                  >
                    <Quote className="w-4 h-4" />
                    Compartí tu experiencia
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Invitación a registrarse si no está logueado */}
          {!user && !cargando && (
            <div className="mt-10 text-center">
              <p className="text-sm text-[#9e9e9e]">
                ¿Fuiste cliente de Fátima?{' '}
                <a href="/portal/registro" className="text-[#8A6BA8] font-semibold hover:underline">
                  Creá tu cuenta
                </a>{' '}
                para compartir tu experiencia.
              </p>
            </div>
          )}
        </div>
      </section>

      {showModal && (
        <TestimonioModal
          user={user}
          onClose={() => setShowModal(false)}
          onEnviado={handleEnviado}
        />
      )}
    </>
  );
};

export default Testimonials;
