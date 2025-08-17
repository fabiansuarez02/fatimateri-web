import React, { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-[#FDFBF8]/80 backdrop-blur-lg fixed w-full top-0 z-50 shadow-sm">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#inicio" className="font-heading font-bold text-xl text-primary-heading">Fátima Teri</a>
                <div className="hidden md:flex space-x-8">
                    <a href="#acerca" className="text-[#4B4B4B] hover:text-accent-color transition">Sobre Mí</a>
                    <a href="#servicios" className="text-[#4B4B4B] hover:text-accent-color transition">Servicios</a>
                    <a href="#testimonios" className="text-[#4B4B4B] hover:text-accent-color transition">Testimonios</a>
                    <a href="#cursos" className="text-[#4B4B4B] hover:text-accent-color transition">Cursos</a>
                    <a href="#contacto" className="text-[#4B4B4B] hover:text-accent-color transition">Contacto</a>
                </div>
                <button id="mobile-menu-button" className="md:hidden" onClick={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4B4B4B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </nav>
            <div id="mobile-menu" className={`${isMenuOpen ? '' : 'hidden'} md:hidden bg-[#FDFBF8] shadow-lg`}>
                <a href="#acerca" className="block py-2 px-6 text-sm text-[#4B4B4B] hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Sobre Mí</a>
                <a href="#servicios" className="block py-2 px-6 text-sm text-[#4B4B4B] hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Servicios</a>
                <a href="#testimonios" className="block py-2 px-6 text-sm text-[#4B4B4B] hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Testimonios</a>
                <a href="#cursos" className="block py-2 px-6 text-sm text-[#4B4B4B] hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Cursos</a>
                <a href="#contacto" className="block py-2 px-6 text-sm text-[#4B4B4B] hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Contacto</a>
            </div>
        </header>
    );
};

export default Header;
