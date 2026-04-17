import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { directusUrl } from '../lib/directus';

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `${directusUrl}/items/posts?filter[status][_eq]=published&fields=id,titulo,resumen,date_created,imagen_portada&sort=-date_created`
    )
      .then(r => r.json())
      .then(data => {
        if (data.errors) throw new Error(data.errors[0]?.message);
        setPosts(data.data || []);
      })
      .catch(err => {
        console.error(err);
        setError('No se pudieron cargar los artículos. Intenta de nuevo más tarde.');
      })
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('es-MX', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

  return (
    <div className="min-h-screen bg-[#FDFBF8] pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Cabecera */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 text-teal-700 bg-teal-50 rounded-full mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-[#2d2d2d] mb-4">El Oráculo de Hoy</h1>
          <p className="text-lg text-[#6c6c6c] max-w-2xl mx-auto">
            Mensajes, reflexiones y energías guiadas para acompañar tu proceso de sanación y autodescubrimiento.
          </p>
        </div>

        {/* Estados */}
        {loading && (
          <div className="flex flex-col items-center py-20 text-[#8faaa7]">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <p>Sintonizando con el Oráculo...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl flex items-start gap-4">
            <AlertCircle className="shrink-0 w-6 h-6 mt-1" />
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center text-[#6c6c6c] py-10 bg-white rounded-3xl p-8 border border-gray-100">
            El Oráculo está en silencio. Vuelve pronto para nuevos mensajes.
          </div>
        )}

        {/* Lista de posts */}
        {!loading && !error && posts.length > 0 && (
          <div className="space-y-8">
            {posts.map(post => (
              <article
                key={post.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Imagen de portada */}
                {post.imagen_portada && (
                  <img
                    src={`${directusUrl}/assets/${post.imagen_portada}`}
                    alt={post.titulo}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-6 md:p-8">
                  <div className="flex items-center text-sm text-[#8faaa7] font-medium mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(post.date_created)}
                  </div>
                  <h2 className="text-2xl font-bold text-[#2d2d2d] mb-3 group-hover:text-teal-800 transition-colors">
                    <Link to={`/blog/${post.id}`}>{post.titulo}</Link>
                  </h2>
                  {post.resumen && (
                    <p className="text-[#6c6c6c] leading-relaxed mb-6 line-clamp-3">
                      {post.resumen}
                    </p>
                  )}
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center text-teal-700 font-semibold hover:text-teal-900 transition-all group-hover:translate-x-1"
                  >
                    Leer mensaje completo <ChevronRight className="w-5 h-5 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
