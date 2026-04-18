import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
    const scrollToNext = () => {
        const el = document.getElementById('sobre-mi') || document.getElementById('servicios');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="inicio" className="pt-24 pb-8 md:pt-32 md:pb-10 bg-[#F8F4FF]">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-primary-heading font-heading">Despierta tu Armonía Interior</h1>
                <p className="mt-4 text-lg md:text-xl text-[#4B4B4B] max-w-3xl mx-auto">Tu camino hacia el equilibrio y la sanación energética comienza aquí.</p>
                <div className="mt-8">
                    <p className="text-base text-gray-500 max-w-2xl mx-auto">En un mundo en constante movimiento, tu energía puede desequilibrarse. Con <strong>Limpieza Energética con Péndulo</strong>, te ofrezco un espacio seguro y amoroso para restaurar tu vitalidad, liberar lo que te detiene y reconectar con tu esencia más pura.</p>
                </div>
                <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <a href="#servicios" className="cta-button-primary font-bold py-3 px-8 rounded-full text-lg w-full sm:w-auto">¡Explora Mis Servicios!</a>
                    <a href="#contacto" className="cta-button-secondary font-bold py-3 px-8 rounded-full text-lg w-full sm:w-auto">¡Agenda tu Sesión Hoy!</a>
                </div>
                <div className="mt-10 text-center">
                    <p className="text-sm text-gray-500 font-semibold tracking-wider">Con <strong>dieciocho años de acompañamiento</strong> en el camino de la sanación energética.</p>
                </div>

                {/* ── Indicador de scroll ── */}
                <button
                    onClick={scrollToNext}
                    aria-label="Ver más contenido"
                    className="mt-10 mx-auto flex flex-col items-center gap-1 text-[#8A6BA8]/70 hover:text-[#8A6BA8] transition-colors group"
                >
                    <span className="text-xs font-medium tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                        Seguí explorando
                    </span>
                    <ChevronDown className="w-6 h-6 animate-bounce" />
                </button>
            </div>
        </section>
    );
};

export default Hero;
