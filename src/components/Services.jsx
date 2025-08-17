import React, { useState } from 'react';

const Services = () => {
    const [activeTab, setActiveTab] = useState('limpieza');

    const renderContent = () => {
        switch (activeTab) {
            case 'limpieza':
                return (
                    <div id="limpieza-content">
                        <h3 className="font-heading text-2xl font-bold text-accent-color mb-4">Limpieza Energética con Péndulo</h3>
                        <p className="mb-6 text-[#4B4B4B]">Es una poderosa técnica que utiliza la radiestesia para detectar y eliminar bloqueos, energías estancadas y patrones negativos que afectan tu bienestar, restaurando el flujo natural de tu vitalidad.</p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-lg mb-2 text-primary-heading">Áreas de Impacto:</h4>
                                <ul className="list-none space-y-2 text-[#4B4B4B]">
                                    <li className="flex items-start"><span className="mr-2 text-accent-color">&#10022;</span><span>Laboral, Proyectos, Dinero</span></li>
                                    <li className="flex items-start"><span className="mr-2 text-accent-color">&#10022;</span><span>Relaciones, Vínculos, Ancestros</span></li>
                                    <li className="flex items-start"><span className="mr-2 text-accent-color">&#10022;</span><span>Salud, Bienestar, Cuerpos Sutiles</span></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg mb-2 text-primary-heading">Proceso de la Sesión (A distancia):</h4>
                                <ol className="list-none space-y-2 text-[#4B4B4B]">
                                    <li className="flex items-start"><span className="mr-2 text-accent-color font-bold">1.</span><span>Evaluación inicial por videollamada.</span></li>
                                    <li className="flex items-start"><span className="mr-2 text-accent-color font-bold">2.</span><span>Realización de la limpieza mientras te relajas.</span></li>
                                    <li className="flex items-start"><span className="mr-2 text-accent-color font-bold">3.</span><span>Conexión final para comentar resultados.</span></li>
                                    <li className="flex items-start"><span className="mr-2 text-accent-color font-bold">4.</span><span>Envío de informe escrito o audio post-sesión.</span></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                );
            case 'paquetes':
                return (
                    <div id="paquetes-content">
                        <h3 className="font-heading text-2xl font-bold text-accent-color mb-4">Paquetes de Sesiones</h3>
                        <p className="mb-6 text-[#4B4B4B]">Para un proceso de sanación más profundo y duradero, te ofrezco Packs de Sesiones con precios reducidos, permitiendo un cambio total en tu sistema energético.</p>
                        <div className="grid sm:grid-cols-2 gap-6 text-center">
                            <div className="border border-stone-200 p-6 rounded-lg bg-[#FDFBF8]">
                                <h4 className="font-heading text-xl font-semibold text-primary-heading">Pack de 3 Sesiones</h4>
                                <p className="mt-2 text-[#4B4B4B]">Ideal para iniciar un proceso de armonización gradual y sostenido.</p>
                            </div>
                            <div className="border border-stone-200 p-6 rounded-lg bg-[#FDFBF8]">
                                <h4 className="font-heading text-xl font-semibold text-primary-heading">Pack de 5 Sesiones</h4>
                                <p className="mt-2 text-[#4B4B4B]">El camino hacia una transformación profunda y consolidada.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'complementarios':
                return (
                    <div id="complementarios-content">
                        <h3 className="font-heading text-2xl font-bold text-accent-color mb-4">Terapias Complementarias</h3>
                        <p className="mb-6 text-[#4B4B4B]">Amplía tu camino de sanación con estas terapias holísticas que se integran perfectamente para un bienestar completo.</p>
                        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 text-[#4B4B4B]">
                             <li className="flex items-center"><span className="mr-2 text-accent-color">&#10038;</span>Equilibrado de Chakras</li>
                             <li className="flex items-center"><span className="mr-2 text-accent-color">&#10038;</span>Péndulo Hebreo</li>
                             <li className="flex items-center"><span className="mr-2 text-accent-color">&#10038;</span>Reiki</li>
                             <li className="flex items-center"><span className="mr-2 text-accent-color">&#10038;</span>Biodecodificación</li>
                             <li className="flex items-center"><span className="mr-2 text-accent-color">&#10038;</span>Registros Akáshicos</li>
                             <li className="flex items-center"><span className="mr-2 text-accent-color">&#10038;</span>Sanación de Útero</li>
                        </ul>
                    </div>
                );
            case 'espacios':
                return (
                    <div id="espacios-content">
                        <h3 className="font-heading text-2xl font-bold text-accent-color mb-4">Limpieza para Espacios y Animales</h3>
                        <p className="mb-6 text-[#4B4B4B]">La energía de nuestro entorno y de nuestros compañeros animales también necesita armonía. Estas terapias se realizan a distancia para su comodidad.</p>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="border border-stone-200 p-6 rounded-lg bg-[#FDFBF8]">
                                <h4 className="font-heading text-xl font-semibold text-primary-heading">Limpieza Energética de Hogares y Negocios</h4>
                                <p className="mt-2 text-[#4B4B4B]">Purifica y armoniza la energía de tus espacios para crear un ambiente de paz, bienestar y prosperidad.</p>
                            </div>
                            <div className="border border-stone-200 p-6 rounded-lg bg-[#FDFBF8]">
                                <h4 className="font-heading text-xl font-semibold text-primary-heading">Terapia Energética para Animales</h4>
                                <p className="mt-2 text-[#4B4B4B]">Brinda equilibrio y bienestar a tus mascotas, ayudando en problemas de comportamiento o salud.</p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section id="servicios" className="py-16 md:py-24 bg-[#F8F4FF]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-heading font-heading">Servicios de Sanación Energética Integral</h2>
                    <p className="mt-4 text-[#4B4B4B] max-w-2xl mx-auto">Aquí encontrarás un abanico de terapias diseñadas para tu bienestar. Navega por las pestañas para descubrir cómo puedo ayudarte a encontrar tu equilibrio y armonía.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8" id="service-tabs">
                    <button onClick={() => setActiveTab('limpieza')} className={`service-tab text-sm md:text-base font-semibold py-2 px-4 rounded-full border-2 transition ${activeTab === 'limpieza' ? 'active-tab' : 'inactive-tab'}`}>Limpieza con Péndulo</button>
                    <button onClick={() => setActiveTab('paquetes')} className={`service-tab text-sm md:text-base font-semibold py-2 px-4 rounded-full border-2 transition ${activeTab === 'paquetes' ? 'active-tab' : 'inactive-tab'}`}>Paquetes de Sesiones</button>
                    <button onClick={() => setActiveTab('complementarios')} className={`service-tab text-sm md:text-base font-semibold py-2 px-4 rounded-full border-2 transition ${activeTab === 'complementarios' ? 'active-tab' : 'inactive-tab'}`}>Terapias Complementarias</button>
                    <button onClick={() => setActiveTab('espacios')} className={`service-tab text-sm md:text-base font-semibold py-2 px-4 rounded-full border-2 transition ${activeTab === 'espacios' ? 'active-tab' : 'inactive-tab'}`}>Espacios y Animales</button>
                </div>

                <div id="service-content" className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-stone-200 min-h-[300px]">
                    {renderContent()}
                </div>
            </div>
        </section>
    );
};

export default Services;
