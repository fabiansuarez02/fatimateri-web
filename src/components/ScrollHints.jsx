import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollHints() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total   = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
      setShowTop(scrolled > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* ── Barra de progreso (top) ── */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#8A6BA8] to-[#8faaa7] transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ── Botón volver arriba ── */}
      <button
        onClick={scrollToTop}
        aria-label="Volver al inicio"
        className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#8A6BA8] text-white shadow-lg shadow-[#8A6BA8]/30 flex items-center justify-center transition-all duration-300 hover:bg-[#7558a0] hover:scale-110 active:scale-95
          ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </>
  );
}
