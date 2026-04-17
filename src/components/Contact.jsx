import React, { useState } from 'react';
import { Send, Phone, Mail, CheckCircle, Loader2 } from 'lucide-react';

const IconInstagram = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const IconFacebook = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
import { directusUrl } from '../lib/directus';

const SERVICIOS = [
  { value: '',               label: 'Selecciona un servicio (opcional)' },
  { value: 'pendulo',        label: 'Limpieza con Péndulo' },
  { value: 'reiki',          label: 'Reiki' },
  { value: 'complementaria', label: 'Terapia Complementaria' },
  { value: 'cursos',         label: 'Cursos / Talleres' },
  { value: 'general',        label: 'Consulta general' },
];

const Contact = () => {
  const [form, setForm] = useState({
    nombre: '', email: '', telefono: '', servicio_interes: '', mensaje: ''
  });
  const [loading, setLoading]   = useState(false);
  const [enviado, setEnviado]   = useState(false);
  const [error, setError]       = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const body = { ...form };
      if (!body.servicio_interes) delete body.servicio_interes;
      if (!body.telefono) delete body.telefono;

      const res = await fetch(`${directusUrl}/items/mensajes_contacto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.errors?.[0]?.message || 'Error al enviar el mensaje');
      }

      setEnviado(true);
      setForm({ nombre: '', email: '', telefono: '', servicio_interes: '', mensaje: '' });
    } catch (err) {
      setError(err.message || 'No se pudo enviar el mensaje. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-16 md:py-24 bg-gradient-to-b from-[#FDFBF8] to-[#f4ebe1]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-heading font-heading">
            Conéctate con tu Bienestar
          </h2>
          <p className="mt-4 text-[#4B4B4B] max-w-2xl mx-auto">
            Estoy aquí para responder tus preguntas y acompañarte. Elige tu forma preferida de contacto y da el primer paso hacia tu armonía.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">

          {/* Columna izquierda — info */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-heading text-2xl font-semibold text-primary-heading mb-6">
                Información de Contacto
              </h3>

              <a
                href="https://wa.me/5493814439445"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#4B4B4B] hover:text-[#8A6BA8] mb-5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center group-hover:bg-[#bbf7d0] transition-colors">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-[#9e9e9e]">WhatsApp</p>
                  <p className="font-medium">+54 9 381 443 9445</p>
                </div>
              </a>

              <a
                href="mailto:contacto@fatimateri.com"
                className="flex items-center gap-3 text-[#4B4B4B] hover:text-[#8A6BA8] mb-8 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ede9fe] flex items-center justify-center group-hover:bg-[#ddd6fe] transition-colors">
                  <Mail className="w-5 h-5 text-[#8A6BA8]" />
                </div>
                <div>
                  <p className="text-xs text-[#9e9e9e]">Email</p>
                  <p className="font-medium">contacto@fatimateri.com</p>
                </div>
              </a>

              <h4 className="font-heading font-semibold text-primary-heading mb-3">Sígueme en Redes</h4>
              <div className="flex gap-3">
                <a href="#" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#fce7f3] text-pink-600 hover:bg-pink-100 text-sm font-medium transition-colors">
                  <IconInstagram /> Instagram
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#dbeafe] text-blue-600 hover:bg-blue-100 text-sm font-medium transition-colors">
                  <IconFacebook /> Facebook
                </a>
              </div>
            </div>

            <p className="mt-8 text-sm text-[#9e9e9e] italic">
              "El primer paso hacia tu bienestar comienza con una simple consulta."
            </p>
          </div>

          {/* Columna derecha — formulario */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg rounded-3xl p-8">

            {/* Estado de éxito */}
            {enviado ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#dcfce7] flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold font-heading text-[#2d2d2d] mb-2">
                  ¡Mensaje enviado!
                </h3>
                <p className="text-[#6c6c6c] mb-6">
                  Gracias por escribirme. Te responderé a la brevedad.
                </p>
                <button
                  onClick={() => setEnviado(false)}
                  className="text-sm text-[#8faaa7] hover:text-[#6a8b87] font-medium transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-heading text-xl font-semibold text-primary-heading mb-2">
                  Escríbeme
                </h3>

                {error && (
                  <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                {/* Nombre + Email */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#4B4B4B] mb-1.5" htmlFor="nombre">
                      Nombre <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="nombre" name="nombre" type="text" required
                      value={form.nombre} onChange={handleChange}
                      placeholder="Tu nombre"
                      className="w-full px-3 py-2.5 bg-white/50 border border-[#e2d4c3] rounded-xl text-sm focus:ring-2 focus:ring-[#8faaa7] focus:border-transparent outline-none transition-all placeholder-[#c4b5a0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4B4B4B] mb-1.5" htmlFor="email">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email" name="email" type="email" required
                      value={form.email} onChange={handleChange}
                      placeholder="tu@correo.com"
                      className="w-full px-3 py-2.5 bg-white/50 border border-[#e2d4c3] rounded-xl text-sm focus:ring-2 focus:ring-[#8faaa7] focus:border-transparent outline-none transition-all placeholder-[#c4b5a0]"
                    />
                  </div>
                </div>

                {/* Teléfono + Servicio */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#4B4B4B] mb-1.5" htmlFor="telefono">
                      Teléfono / WhatsApp
                    </label>
                    <input
                      id="telefono" name="telefono" type="tel"
                      value={form.telefono} onChange={handleChange}
                      placeholder="+54 9 ..."
                      className="w-full px-3 py-2.5 bg-white/50 border border-[#e2d4c3] rounded-xl text-sm focus:ring-2 focus:ring-[#8faaa7] focus:border-transparent outline-none transition-all placeholder-[#c4b5a0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4B4B4B] mb-1.5" htmlFor="servicio_interes">
                      Me interesa
                    </label>
                    <select
                      id="servicio_interes" name="servicio_interes"
                      value={form.servicio_interes} onChange={handleChange}
                      className="w-full px-3 py-2.5 bg-white/50 border border-[#e2d4c3] rounded-xl text-sm focus:ring-2 focus:ring-[#8faaa7] focus:border-transparent outline-none transition-all text-[#4B4B4B]"
                    >
                      {SERVICIOS.map(s => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-xs font-medium text-[#4B4B4B] mb-1.5" htmlFor="mensaje">
                    Mensaje <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="mensaje" name="mensaje" rows={4} required
                    value={form.mensaje} onChange={handleChange}
                    placeholder="Cuéntame cómo puedo ayudarte..."
                    className="w-full px-3 py-2.5 bg-white/50 border border-[#e2d4c3] rounded-xl text-sm focus:ring-2 focus:ring-[#8faaa7] focus:border-transparent outline-none transition-all placeholder-[#c4b5a0] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#8A6BA8] hover:bg-[#7a5c96] text-white font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-[#8A6BA8]/20"
                >
                  {loading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
                    : <><Send className="w-4 h-4" /> Enviar mensaje</>
                  }
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
