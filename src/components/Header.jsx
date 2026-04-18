import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_SECTIONS = [
    { id: 'acerca',    label: 'Sobre Mí' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'cursos',    label: 'Cursos' },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen]       = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [activeSection, setActiveSection]  = useState('');
    const { user, logout } = useAuth();
    const navigate  = useNavigate();
    const location  = useLocation();
    const userMenuRef = useRef(null);

    // ── Detecta sección activa en scroll ──
    useEffect(() => {
        if (location.pathname !== '/') { setActiveSection(''); return; }
        const ids = NAV_SECTIONS.map(s => s.id);
        const onScroll = () => {
            let current = '';
            for (const id of ids) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= 100) current = id;
            }
            setActiveSection(current);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [location.pathname]);

    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        setIsMenuOpen(false);
        const doScroll = () => {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        };
        if (location.pathname === '/') { doScroll(); }
        else { navigate('/'); setTimeout(doScroll, 100); }
    };

    // Cerrar dropdown al hacer clic afuera
    useEffect(() => {
        const handler = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target))
                setIsUserMenuOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleLogout = async () => {
        setIsUserMenuOpen(false);
        setIsMenuOpen(false);
        await logout();
        navigate('/');
    };

    const displayName = user?.first_name || user?.email?.split('@')[0] || 'Mi Espacio';

    // Clases del link según si está activo o no
    const linkClass = (id) =>
        `relative px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer
        ${activeSection === id
            ? 'text-[#8A6BA8] bg-[#F3EFF8]'
            : 'text-[#2d2d2d] hover:text-[#8A6BA8] hover:bg-[#F3EFF8]'}`;

    return (
        <header className="bg-[#FDFBF8]/90 backdrop-blur-lg fixed w-full top-0 z-50 border-b border-[#e8e0f5]/60 shadow-sm">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="font-heading font-bold text-xl text-primary-heading shrink-0">
                    Fátima Teri
                </Link>

                {/* ── Menú escritorio ── */}
                <div className="hidden md:flex items-center gap-1">
                    {NAV_SECTIONS.map(({ id, label }) => (
                        <a
                            key={id}
                            href={`/#${id}`}
                            onClick={e => scrollToSection(e, id)}
                            className={linkClass(id)}
                        >
                            {label}
                            {activeSection === id && (
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#8A6BA8]" />
                            )}
                        </a>
                    ))}

                    {/* El Oráculo (Blog) */}
                    <Link
                        to="/blog"
                        className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200
                            ${location.pathname.startsWith('/blog')
                                ? 'text-[#8faaa7] bg-[#EAF3F2]'
                                : 'text-[#3a6b67] hover:text-[#2d5550] hover:bg-[#EAF3F2]'}`}
                    >
                        ✨ El Oráculo
                    </Link>

                    <div className="w-px h-5 bg-[#e2d4c3] mx-2" />

                    {/* Sin sesión → botón login */}
                    {!user && (
                        <Link
                            to="/portal/login"
                            className="bg-[#8A6BA8] hover:bg-[#7558a0] text-white px-4 py-2 rounded-full transition-all shadow-md shadow-[#8A6BA8]/20 text-sm font-semibold hover:scale-105 active:scale-95"
                        >
                            Mi Espacio
                        </Link>
                    )}

                    {/* Con sesión → avatar + dropdown */}
                    {user && (
                        <div className="relative" ref={userMenuRef}>
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-2 bg-[#8A6BA8] hover:bg-[#7558a0] text-white px-4 py-2 rounded-full transition-all shadow-md shadow-[#8A6BA8]/20 text-sm font-semibold"
                            >
                                <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center">
                                    <User className="w-3 h-3" />
                                </div>
                                {displayName}
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#e2d4c3]/60 overflow-hidden">
                                    <div className="px-4 py-3 border-b border-[#f0e8df]">
                                        <p className="text-xs text-[#9e9e9e]">Conectada como</p>
                                        <p className="text-sm font-semibold text-[#2d2d2d] truncate">{user.email}</p>
                                    </div>
                                    <Link to="/portal/dashboard" onClick={() => setIsUserMenuOpen(false)}
                                        className="flex items-center gap-2 px-4 py-3 text-sm text-[#4B4B4B] hover:bg-[#f9f4ef] transition">
                                        <LayoutDashboard className="w-4 h-4 text-[#8faaa7]" /> Mi Dashboard
                                    </Link>
                                    <button onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition">
                                        <LogOut className="w-4 h-4" /> Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* ── Botón hamburguesa ── */}
                <button
                    className="md:hidden w-9 h-9 rounded-lg bg-[#F3EFF8] flex items-center justify-center text-[#8A6BA8] hover:bg-[#e8e0f5] transition"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Abrir menú"
                >
                    {isMenuOpen ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </nav>

            {/* ── Menú móvil ── */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#FDFBF8] border-t border-[#e8e0f5]/60 shadow-lg">
                    <div className="px-4 py-3 space-y-1">
                        {NAV_SECTIONS.map(({ id, label }) => (
                            <a
                                key={id}
                                href={`/#${id}`}
                                onClick={e => scrollToSection(e, id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                                    ${activeSection === id
                                        ? 'text-[#8A6BA8] bg-[#F3EFF8] border-l-4 border-[#8A6BA8]'
                                        : 'text-[#2d2d2d] hover:text-[#8A6BA8] hover:bg-[#F3EFF8]'}`}
                            >
                                {label}
                            </a>
                        ))}
                        <Link
                            to="/blog"
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                                ${location.pathname.startsWith('/blog')
                                    ? 'text-[#3a6b67] bg-[#EAF3F2] border-l-4 border-[#8faaa7]'
                                    : 'text-[#3a6b67] hover:bg-[#EAF3F2]'}`}
                        >
                            ✨ El Oráculo
                        </Link>
                    </div>

                    <div className="border-t border-[#e8e0f5]/60 px-4 py-3">
                        {!user ? (
                            <Link
                                to="/portal/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#8A6BA8] text-white text-sm font-semibold shadow-md"
                            >
                                <User className="w-4 h-4" /> Mi Espacio
                            </Link>
                        ) : (
                            <>
                                <div className="flex items-center gap-3 px-1 py-2 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-[#BDB2E8]/30 flex items-center justify-center shrink-0">
                                        <User className="w-4 h-4 text-[#8A6BA8]" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-[#2d2d2d] truncate">{displayName}</p>
                                        <p className="text-xs text-[#9e9e9e] truncate">{user.email}</p>
                                    </div>
                                </div>
                                <Link
                                    to="/portal/dashboard"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#4B4B4B] hover:bg-[#f9f4ef] font-medium transition"
                                >
                                    <LayoutDashboard className="w-4 h-4 text-[#8faaa7]" /> Mi Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-50 font-medium transition"
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
