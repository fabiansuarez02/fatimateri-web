import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, Sparkles } from 'lucide-react';

export default function BlogList() {
  // Datos mockeados hasta que se conecte con Strapi
  const posts = [
    { id: 1, title: 'La energía del eclipse: Cómo limpiarse', date: '5 de Abril, 2026', excerpt: 'Hoy quiero compartir con ustedes un ritual muy sencillo con péndulo para soltar densidades tras el eclipse...' },
    { id: 2, title: 'El significado de la carta El Loco en tus lecturas diarias', date: '3 de Abril, 2026', excerpt: 'Muchas veces tememos a esta carta porque la asociamos con imprudencia, pero en realidad es un hermoso...' },
    { id: 3, title: 'Cristales esenciales para el chakra corazón', date: '1 de Abril, 2026', excerpt: 'El chakra corazón, o Anahata, es nuestro centro de amor y compasión. Cuando está bloqueado...' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF8] pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 text-teal-700 bg-teal-50 rounded-full mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-[#2d2d2d] mb-4">El Oráculo de Hoy</h1>
          <p className="text-lg text-[#6c6c6c] max-w-2xl mx-auto">
            Mensajes, reflexiones y energías guiadas para acompañar tu proceso de sanación y autodescubrimiento.
          </p>
        </div>

        <div className="space-y-8">
          {posts.map(post => (
            <article key={post.id} className="group bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center text-sm text-[#8faaa7] font-medium mb-3">
                <Calendar className="w-4 h-4 mr-2" /> {post.date}
              </div>
              <h2 className="text-2xl font-bold text-[#2d2d2d] mb-3 group-hover:text-teal-800 transition-colors">
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
              </h2>
              <p className="text-[#6c6c6c] leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <Link to={`/blog/${post.id}`} className="inline-flex items-center text-teal-700 font-semibold hover:text-teal-900 group-hover:translate-x-1 transition-transform">
                Leer mensaje completo <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </article>
          ))}
        </div>
        
        {/* Paginación simple mockeada */}
        <div className="mt-16 flex justify-center">
             <button className="px-6 py-2 border-2 border-teal-700 text-teal-800 rounded-full font-semibold hover:bg-teal-700 hover:text-white transition-colors">
               Cargar mensajes anteriores
             </button>
        </div>
      </div>
    </div>
  );
}
