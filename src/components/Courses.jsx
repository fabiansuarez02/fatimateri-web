import React, { useEffect, useState } from 'react';
import { MessageCircle, Calendar, Clock, Monitor, MapPin, Loader2, Sparkles } from 'lucide-react';
import { directusUrl } from '../lib/directus';

const WA_NUMBER = '5493814439445';

const MODALIDAD_LABELS = {
  presencial: { label: 'Presencial', icon: MapPin,    color: 'bg-[#f9dfc5]/60 text-[#7a4e2a]' },
  online:     { label: 'Online',     icon: Monitor,   color: 'bg-[#cbe3e0]/60 text-[#3a6b67]' },
  ambas:      { label: 'Pres. y Online', icon: Monitor, color: 'bg-[#BDB2E8]/40 text-[#5a4080]' },
};

function CourseCard({ curso }) {
  const modalidad = MODALIDAD_LABELS[curso.modalidad] || { label: curso.modalidad, icon: Monitor, color: 'bg-gray-100 text-gray-600' };
  const ModalIcon = modalidad.icon;

  const proximoInicio = curso.proximo_inicio
    ? new Date(curso.proximo_inicio + 'T12:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  const waMsg = encodeURIComponent(`Hola Fátima! Me interesa el curso "${curso.titulo}". ¿Podés darme más información?`);
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;

  const imagenUrl = curso.imagen
    ? `${directusUrl}/assets/${curso.imagen}?width=600&quality=80`
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex flex-col transition-all hover:shadow-md hover:-translate-y-0.5">
      {/* Imagen o placeholder */}
      {imagenUrl ? (
        <div className="h-40 overflow-hidden">
          <img src={imagenUrl} alt={curso.titulo} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="h-40 bg-gradient-to-br from-[#F3EFF8] to-[#e8e0f5] flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-[#BDB2E8]" />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {/* Modalidad badge */}
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full w-fit mb-3 ${modalidad.color}`}>
          <ModalIcon className="w-3 h-3" />
          {modalidad.label}
        </span>

        <h3 className="font-heading text-lg font-bold text-[#2d2d2d] mb-2 leading-snug">
          {curso.titulo}
        </h3>

        {curso.descripcion && (
          <p className="text-sm text-[#6c6c6c] mb-4 flex-1 leading-relaxed">
            {curso.descripcion}
          </p>
        )}

        {/* Detalles */}
        <div className="space-y-1.5 mb-4">
          {curso.duracion && (
            <div className="flex items-center gap-2 text-xs text-[#4B4B4B]">
              <Clock className="w-3.5 h-3.5 text-[#8faaa7] shrink-0" />
              <span>{curso.duracion}</span>
            </div>
          )}
          {proximoInicio && (
            <div className="flex items-center gap-2 text-xs text-[#4B4B4B]">
              <Calendar className="w-3.5 h-3.5 text-[#8A6BA8] shrink-0" />
              <span>Próximo inicio: {proximoInicio}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <MessageCircle className="w-4 h-4" />
          Consultar e inscribirme
        </a>
      </div>
    </div>
  );
}

const Courses = () => {
  const [cursos, setCursos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${directusUrl}/items/cursos?filter[status][_eq]=published&sort=sort,proximo_inicio&fields=id,titulo,descripcion,modalidad,duracion,proximo_inicio,precio,imagen`)
      .then(r => r.json())
      .then(data => {
        if (data.errors) throw new Error(data.errors[0]?.message);
        setCursos(data.data || []);
      })
      .catch(err => setError('No se pudieron cargar los cursos.'))
      .finally(() => setCargando(false));
  }, []);

  return (
    <section id="cursos" className="py-16 md:py-24 bg-[#F8F4FF]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-heading font-heading">
            Escuela Indigo: Cursos y Talleres
          </h2>
          <p className="mt-4 text-[#4B4B4B] max-w-2xl mx-auto">
            Te invito a mis cursos y talleres online, diseñados para que aprendas a gestionar tu energía
            y a aplicar técnicas de bienestar en tu vida diaria.
          </p>
        </div>

        {cargando && (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-[#8faaa7]" />
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm text-center">
            {error}
          </div>
        )}

        {!cargando && !error && cursos.length === 0 && (
          <div className="text-center py-16">
            <div className="w-14 h-14 rounded-full bg-[#BDB2E8]/20 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7 text-[#BDB2E8]" />
            </div>
            <p className="text-[#4B4B4B] font-medium mb-1">Próximos cursos en camino</p>
            <p className="text-sm text-[#6c6c6c]">Seguí nuestras redes para enterarte de los próximos talleres y cursos disponibles.</p>
          </div>
        )}

        {!cargando && !error && cursos.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cursos.map(curso => (
              <CourseCard key={curso.id} curso={curso} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;
