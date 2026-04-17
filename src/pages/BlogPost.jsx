import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, UserRound, Loader2, AlertCircle } from 'lucide-react';
import { directusUrl } from '../lib/directus';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `${directusUrl}/items/posts/${id}?fields=id,titulo,resumen,contenido,date_created,imagen_portada`
    )
      .then(r => r.json())
      .then(data => {
        if (data.errors) throw new Error(data.errors[0]?.message);
        setPost(data.data);
      })
      .catch(err => {
        console.error(err);
        setError('No logramos encontrar este mensaje astral.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('es-MX', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

  return (
    <div className="min-h-screen bg-[#FDFBF8] pt-28 pb-20 px-4 md:px-0">
      <div className="max-w-3xl mx-auto">

        <Link to="/blog" className="inline-flex items-center text-[#6c6c6c] hover:text-[#2d2d2d] mb-10 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Oráculo
        </Link>

        {loading && (
          <div className="flex justify-center py-20 text-[#8faaa7]">
            <Loader2 className="w-12 h-12 animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl flex items-center gap-4">
            <AlertCircle className="w-6 h-6" /> {error}
          </div>
        )}

        {!loading && !error && post && (
          <>
            {/* Imagen de portada */}
            {post.imagen_portada && (
              <img
                src={`${directusUrl}/assets/${post.imagen_portada}`}
                alt={post.titulo}
                className="w-full h-64 md:h-80 object-cover rounded-3xl mb-10"
              />
            )}

            <header className="mb-10">
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-[#2d2d2d] mb-6 leading-tight">
                {post.titulo}
              </h1>
              {post.resumen && (
                <p className="text-lg text-[#6c6c6c] mb-6 leading-relaxed italic border-l-4 border-[#BDB2E8] pl-4">
                  {post.resumen}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-[#8faaa7] font-medium text-sm border-b border-gray-200 pb-8">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="capitalize">{formatDate(post.date_created)}</span>
                </div>
                <div className="flex items-center">
                  <UserRound className="w-4 h-4 mr-2" /> Por Fátima Teri
                </div>
              </div>
            </header>

            {/* Contenido */}
            <article
              className="prose prose-lg prose-[#4B4B4B] max-w-none marker:text-teal-600 prose-a:text-teal-700 hover:prose-a:text-teal-900 prose-headings:font-heading prose-headings:text-[#2d2d2d]"
              dangerouslySetInnerHTML={{ __html: post.contenido }}
            />

            {/* Volver */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#BDB2E8] text-[#8A6BA8] hover:bg-[#BDB2E8]/10 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Ver todos los mensajes
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
