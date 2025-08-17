import React from 'react';

const Courses = () => {
    return (
        <section id="cursos" className="py-16 md:py-24 bg-[#F8F4FF]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-heading font-heading">Escuela Indigo: Cursos y Talleres</h2>
                    <p className="mt-4 text-[#4B4B4B] max-w-2xl mx-auto">Te invito a mis cursos y talleres online, diseñados para que aprendas a gestionar tu energía y a aplicar técnicas de bienestar en tu vida diaria.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 text-center flex flex-col justify-between">
                        <h3 className="font-heading text-lg font-semibold text-accent-color">Limpieza con Péndulo y Códigos Sagrados</h3>
                        <p className="text-sm text-gray-500 my-3">Aprende los fundamentos del péndulo y la activación de códigos sagrados.</p>
                        <a href="#contacto" className="cta-button-secondary font-bold py-2 px-4 rounded-full text-sm mt-auto">¡Quiero Unirme Ahora!</a>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 text-center flex flex-col justify-between">
                        <h3 className="font-heading text-lg font-semibold text-accent-color">Introducción al Tarot Holístico</h3>
                        <p className="text-sm text-gray-500 my-3">Descubre la simbología del Tarot y la lectura intuitiva para el autoconocimiento.</p>
                        <a href="#contacto" className="cta-button-secondary font-bold py-2 px-4 rounded-full text-sm mt-auto">¡Reserva tu Lugar!</a>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 text-center flex flex-col justify-between">
                        <h3 className="font-heading text-lg font-semibold text-accent-color">Rituales para la Luna Llena</h3>
                        <p className="text-sm text-gray-500 my-3">Aprende rituales sencillos y efectivos para liberar energías en cada luna llena.</p>
                        <a href="#contacto" className="cta-button-secondary font-bold py-2 px-4 rounded-full text-sm mt-auto">¡Inscríbete Aquí!</a>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 text-center flex flex-col justify-between">
                        <h3 className="font-heading text-lg font-semibold text-accent-color">Taller Portal 8/8</h3>
                        <p className="text-sm text-gray-500 my-3">Activación energética para manifestar la abundancia en todas sus formas.</p>
                        <a href="#contacto" className="cta-button-secondary font-bold py-2 px-4 rounded-full text-sm mt-auto">¡Únete al Portal!</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Courses;
