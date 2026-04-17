import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const userMenuRef = useRef(null);

    // Navega a una sección del home con scroll suave
    // Funciona tanto desde el home como desde otras páginas
    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        setIsMenuOpen(false);
        const doScroll = () => {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        };
        if (location.pathname === '/') {
            doScroll();
        } else {
            navigate('/');
            setTimeout(doScroll, 100);
        }
    };

    const displayName = user?.first_name || user?.email?.split('@')[0] || 'Mi Espacio';

    // Cerrar el menú de usuario al hacer clic afuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        setIsUserMenuOpen(false);
        setIsMenuOpen(false);
        await logout();
        navigate('/');
    };

    return (
        <header className="bg-[#FDFBF8]/80 backdrop-blur-lg fixed w-full top-0 z-50 shadow-sm">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="font-heading font-bold text-xl text-primary-heading">Fátima Teri</Link>

                {/* Menú escritorio */}
                <div className="hidden md:flex space-x-6 items-center">
                    <a href="/#acerca"   onClick={e => scrollToSection(e, 'acerca')}   className="text-[#4B4B4B] hover:text-accent-color transition cursor-pointer">Sobre Mí</a>
                    <a href="/#servicios" onClick={e => scrollToSection(e, 'servicios')} className="text-[#4B4B4B] hover:text-accent-color transition cursor-pointer">Servicios</a>
                    <a href="/#cursos"   onClick={e => scrollToSection(e, 'cursos')}   className="text-[#4B4B4B] hover:text-accent-color transition cursor-pointer">Cursos</a>
                    <Link to="/blog" className="text-teal-700 font-medium hover:text-teal-900 transition flex items-center gap-1">
                        ✨ El Oráculo
                    </Link>

                    {/* Sin sesión → botón login */}
                    {!user && (
                        <Link
                            to="/portal/login"
                            className="bg-teal-700 text-white px-4 py-2 rounded-full hover:bg-teal-800 transition shadow-sm text-sm font-semibold"
                        >
                            Mi Espacio
                        </Link>
                    )}

                    {/* Con sesión → avatar + dropdown */}
                    {user && (
                        <div className="relative" ref={userMenuRef}>
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-full transition shadow-sm text-sm font-semibold"
                            >
                                <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center">
                                    <User className="w-3 h-3" />
                                </div>
                                {displayName}
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#e2d4c3]/60 overflow-hidden">
                                    <div className="px-4 py-3 border-b border-[#f0e8df]">
                                        <p className="text-xs text-[#9e9e9e]">Conectada como</p>
                                        <p className="text-sm font-semibold text-[#2d2d2d] truncate">{user.email}</p>
                                    </div>
                                    <Link
                                        to="/portal/dashboard"
                                        onClick={() => setIsUserMenuOpen(false)}
                                        className="flex items-center gap-2 px-4 py-3 text-sm text-[#4B4B4B] hover:bg-[#f9f4ef] transition"
                                    >
                                        <LayoutDashboard className="w-4 h-4 text-[#8faaa7]" />
                                        Mi Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Botón hamburguesa */}
                <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4B4B4B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </nav>

            {/* Menú móvil */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#FDFBF8] shadow-lg border-t border-[#f0e8df]">
                    <a href="/#acerca"    onClick={e => scrollToSection(e, 'acerca')}    className="block py-3 px-6 text-sm text-[#4B4B4B] hover:bg-[#f9f4ef] cursor-pointer">Sobre Mí</a>
                    <a href="/#servicios" onClick={e => scrollToSection(e, 'servicios')} className="block py-3 px-6 text-sm text-[#4B4B4B] hover:bg-[#f9f4ef] cursor-pointer">Servicios</a>
                    <a href="/#cursos"    onClick={e => scrollToSection(e, 'cursos')}    className="block py-3 px-6 text-sm text-[#4B4B4B] hover:bg-[#f9f4ef] cursor-pointer">Cursos</a>
                    <Link to="/blog"      className="block py-3 px-6 text-sm text-teal-700 font-medium hover:bg-[#f9f4ef]" onClick={() => setIsMenuOpen(false)}>✨ El Oráculo</Link>

                    <div className="border-t border-[#f0e8df] mt-1">
                        {!user && (
                            <Link
                                to="/portal/login"
                                className="block py-3 px-6 text-sm font-semibold text-teal-800 hover:bg-[#f9f4ef]"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                🔐 Mi Espacio
                            </Link>
                        )}

                        {user && (
                            <>
                                <div className="px-6 py-3">
                                    <p className="text-xs text-[#9e9e9e]">Conectada como</p>
                                    <p className="text-sm font-semibold text-[#2d2d2d]">{user.email}</p>
                                </div>
                                <Link
                                    to="/portal/dashboard"
                                    className="flex items-center gap-2 py-3 px-6 text-sm text-[#4B4B4B] hover:bg-[#f9f4ef]"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <LayoutDashboard className="w-4 h-4 text-[#8faaa7]" /> Mi Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 py-3 px-6 text-sm text-red-500 hover:bg-red-50"
                                >
                                    <LogOut className="w-4 h-4" /> Cerrar sesión
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
