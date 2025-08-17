import React from 'react';

const Testimonials = () => {
    return (
        <section id="testimonios" className="py-16 md:py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-heading font-heading">Historias de Transformación</h2>
                    <p className="mt-4 text-[#4B4B4B] max-w-2xl mx-auto">La mayor recompensa es ver el bienestar en la vida de quienes acompaño. Aquí comparto algunas de sus experiencias.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
                        <p className="text-[#4B4B4B] italic">"Después de las sesiones, sentí una liberación y un descanso profundos. La angustia que me oprimía simplemente desapareció. ¡Gracias, Fátima, por tu profesionalidad y tu amor!"</p>
                        <p className="mt-4 font-semibold text-accent-color">- Laura S., 45 años</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
                        <p className="text-[#4B4B4B] italic">"Venía arrastrando problemas laborales. Empecé a sentir una mayor confianza y seguridad. Las cosas comenzaron a fluir de una manera increíble. Su atención y calidez hicieron toda la diferencia."</p>
                        <p className="mt-4 font-semibold text-accent-color">- Martín G., 32 años</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
                        <p className="text-[#4B4B4B] italic">"La limpieza energética en mi hogar fue un antes y un después. El ambiente se siente mucho más ligero y mi descanso mejoró notablemente. Fátima trabaja con una dedicación admirable."</p>
                        <p className="mt-4 font-semibold text-accent-color">- Ana P., 58 años</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
                        <p className="text-[#4B4B4B] italic">"Me sentía estancada en mi vida amorosa. Con la limpieza, Fátima me ayudó a liberar viejos patrones. Hoy me siento más abierta y feliz. Su profesionalidad y empatía son inigualables."</p>
                        <p className="mt-4 font-semibold text-accent-color">- Sofía R., 28 años</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
