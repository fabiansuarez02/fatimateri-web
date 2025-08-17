import React from 'react';

const Contact = () => {
    return (
        <section id="contacto" className="py-16 md:py-24">
            <div className="container mx-auto px-6">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-heading font-heading">Conéctate con tu Bienestar</h2>
                    <p className="mt-4 text-[#4B4B4B] max-w-2xl mx-auto">Estoy aquí para responder tus preguntas y acompañarte. Elige tu forma preferida de contacto y da el primer paso hacia tu armonía.</p>
                </div>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 bg-white p-8 rounded-lg shadow-lg border border-stone-200">
                    <div className="flex flex-col justify-center">
                        <h3 className="font-heading text-2xl font-semibold text-accent-color mb-4">Información de Contacto</h3>
                        <a href="https://wa.me/5493814439445" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-[#4B4B4B] hover:text-accent-color mb-4">
                           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.001 2C5.584 2 2 5.583 2 10.001c0 1.523.42 2.95 1.178 4.193l-1.11 4.045 4.142-1.082A7.94 7.94 0 0010.001 18c4.418 0 8-3.582 8-7.999C18 5.583 14.418 2 10.001 2zM8.955 14.508c-.144.288-.561.419-.88.206-.49-.327-1.637-1.043-2.464-2.352-.713-1.128-.33-1.88.165-2.438.41-.466.72-.549.948-.549.192 0 .384.004.549.022.23.026.384.331.384.66v.018c.001.328-.022.659-.08.835-.08.23-.23.384-.443.612-.213.23-.344.384-.252.576.115.248.513 1.02 1.22 1.637.898.768 1.524.96 1.776 1.038.252.078.406.043.576-.115.213-.192.426-.49.576-.66.171-.192.344-.15.576-.08.384.115.98 1.02 1.134 1.22s.248.306.171.483c-.078.171-.443.513-.72.788z"/></svg>
                           <span>+54 9 381 443 9445</span>
                        </a>
                        <a href="mailto:contacto@fatimateri.com" className="flex items-center space-x-3 text-[#4B4B4B] hover:text-accent-color mb-6">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                            <span>contacto@fatimateri.com</span>
                        </a>
                        <h4 className="font-heading font-semibold text-accent-color mb-2">Sígueme en Redes</h4>
                        <div className="flex space-x-4">
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#4B4B4B] hover:text-accent-color">Instagram</a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#4B4B4B] hover:text-accent-color">Facebook</a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#4B4B4B] hover:text-accent-color">TikTok</a>
                        </div>
                    </div>
                    <div>
                        <form action="#" method="POST">
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input type="text" name="name" id="name" className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-color" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                                <input type="email" name="email" id="email" className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-color" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                                <textarea name="message" id="message" rows="4" className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-color"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="cta-button-primary font-bold py-3 px-8 rounded-full w-full">¡Pide tu Turno Ahora!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
