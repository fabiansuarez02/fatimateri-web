import React from 'react';

const About = () => {
    return (
        <section id="acerca" className="py-16 md:py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                     <h2 className="text-3xl md:text-4xl font-bold text-primary-heading font-heading">Fátima Teri: Tu Guía en el Camino del Bienestar</h2>
                     <p className="mt-4 text-[#4B4B4B] max-w-2xl mx-auto">Mi misión es acompañarte con amor y respeto en tu proceso de liberación y armonización.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
                        <h3 className="font-heading text-xl font-semibold text-accent-color mb-3">Mi Presentación</h3>
                        <p className="text-[#4B4B4B] text-sm">Hola, soy Fátima Teri. Mi recorrido comenzó hace más de dieciocho años, movida por un deseo genuino de ayudar a otros a encontrar su equilibrio. Me he dedicado a estudiar y aplicar diversas técnicas que permiten una armonización profunda y duradera.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
                        <h3 className="font-heading text-xl font-semibold text-accent-color mb-3">Mi Filosofía</h3>
                        <p className="text-[#4B4B4B] text-sm">Mi filosofía se basa en el <strong>amor incondicional, el respeto profundo</strong> por tu proceso individual y la <strong>escucha activa</strong> de tu ritmo. Mi rol es acompañarte, brindándote las herramientas para que descubras tu propio poder de autosanación.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
                        <h3 className="font-heading text-xl font-semibold text-accent-color mb-3">Mi Formación</h3>
                        <p className="text-[#4B4B4B] text-sm">Soy Maestra de Reiki, Terapeuta de Péndulo Hebreo Profesional, y he profundizado en técnicas como Tameana, Biodecodificación, Registros Akáshicos y más. Esta sólida formación me permite ofrecerte un enfoque integral.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
