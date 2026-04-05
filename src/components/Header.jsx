import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-[#FDFBF8]/80 backdrop-blur-lg fixed w-full top-0 z-50 shadow-sm">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="font-heading font-bold text-xl text-primary-heading">Fátima Teri</Link>
                <div className="hidden md:flex space-x-6 items-center">
                    <Link to="/#acerca" className="text-[#4B4B4B] hover:text-accent-color transition">Sobre Mí</Link>
                    <Link to="/#servicios" className="text-[#4B4B4B] hover:text-accent-color transition">Servicios</Link>
                    <Link to="/#cursos" className="text-[#4B4B4B] hover:text-accent-color transition">Cursos</Link>
                    <Link to="/blog" className="text-teal-700 font-medium hover:text-teal-900 transition flex items-center gap-1">
                        ✨ El Oráculo
                    </Link>
                    <Link to="/portal/login" className="bg-teal-700 text-white px-4 py-2 rounded-full hover:bg-teal-800 transition shadow-sm text-sm font-semibold">
                        Mi Espacio
                    </Link>
                </div>
                <button id="mobile-menu-button" className="md:hidden" onClick={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4B4B4B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </nav>
            <div id="mobile-menu" className={`${isMenuOpen ? '' : 'hidden'} md:hidden bg-[#FDFBF8] shadow-lg`}>
                <Link to="/#acerca" className="block py-2 px-6 text-sm text-[#4B4B4B] hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Sobre Mí</Link>
                <Link to="/#servicios" className="block py-2 px-6 text-sm text-[#4B4B4B] hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Servicios</Link>
                <Link to="/#cursos" className="block py-2 px-6 text-sm text-[#4B4B4B] hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Cursos</Link>
                <Link to="/blog" className="block py-2 px-6 text-sm text-teal-700 font-medium hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>✨ El Oráculo</Link>
                <Link to="/portal/login" className="block py-2 px-6 text-sm font-semibold text-teal-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>🔐 Mi Espacio</Link>
            </div>
        </header>
    );
};

export default Header;
