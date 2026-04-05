import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, UserRound } from 'lucide-react';

export default function BlogPost() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#FDFBF8] pt-28 pb-20 px-4 md:px-0">
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="inline-flex items-center text-[#6c6c6c] hover:text-[#2d2d2d] mb-10 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Oráculo
        </Link>
        
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-[#2d2d2d] mb-6 leading-tight">
            La energía del eclipse: Cómo limpiarse {id ? `(Post ID: ${id})` : ''}
          </h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[#8faaa7] font-medium text-sm border-b border-gray-200 pb-8">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" /> 5 de Abril, 2026
            </div>
            <div className="flex items-center">
              <UserRound className="w-4 h-4 mr-2" /> Por Fátima Teri
            </div>
          </div>
        </header>

        {/* Contenido mockeado */}
        <article className="prose prose-lg prose-[#4B4B4B] mx-auto marker:text-teal-600 prose-a:text-teal-700 hover:prose-a:text-teal-900 prose-headings:font-heading prose-headings:text-[#2d2d2d]">
          <p className="lead text-xl text-gray-600 mb-6">
            Hoy quiero compartir con ustedes un ritual muy sencillo con péndulo para soltar densidades tras el eclipse, un momento que suele dejarnos cargados con remanentes energéticos que ya no nos sirven.
          </p>
          <p className="mb-4">
            Todo proceso cósmico nos sacude internamente. Nuestro chakra corona absorbe frecuencias que no siempre nuestro cuerpo denso está preparado para canalizar rápidamente.
          </p>
          <h3 className="text-2xl font-semibold mt-8 mb-4 text-[#2d2d2d]">El paso a paso</h3>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>Consigue un vaso con agua estructurada.</li>
            <li>Calibra tu péndulo con el movimiento "Sí" y "No".</li>
            <li>Pregunta: "¿Es seguro limpiar mi energía residual de este evento ahora mismo?"</li>
          </ul>
          <p>
            Recuerden siempre intencionar desde el puro amor. Si sienten pesadez, pueden escribirme para agendar una sesión personalizada de equilibrio integral.
          </p>
        </article>
      </div>
    </div>
  );
}
