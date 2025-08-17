import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#EFEBF7] text-[#4B4B4B]">
            <div className="container mx-auto px-6 py-8">
                <div className="text-center mb-6">
                    <h3 className="font-heading text-lg font-semibold text-primary-heading">Mantente Conectado/a con tu Armonía</h3>
                    <p className="text-sm mt-2">Únete a nuestra comunidad y recibe novedades, artículos y promociones exclusivas.</p>
                    <form action="#" method="POST" className="mt-4 max-w-md mx-auto flex">
                        <input type="email" placeholder="Tu correo electrónico" className="w-full px-4 py-2 border border-stone-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-accent-color" />
                        <button type="submit" className="bg-accent-color text-white font-semibold px-6 py-2 rounded-r-full hover:bg-primary-heading transition">Suscribirme</button>
                    </form>
                </div>
                <div className="border-t border-stone-300 pt-6 text-center text-xs">
                    <p className="mb-2"><strong>Descargo de Responsabilidad:</strong> Las terapias complementarias ofrecidas no sustituyen la atención médica o psicológica profesional. Ante cualquier condición de salud, consulta con un profesional calificado.</p>
                    <div className="space-x-4 mb-4">
                        <a href="#" className="hover:text-accent-color">Política de Privacidad</a>
                        <span>|</span>
                        <a href="#" className="hover:text-accent-color">Política de Cookies</a>
                    </div>
                    <p>&copy; 2025 Fátima Teri. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
