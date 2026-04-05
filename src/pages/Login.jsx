import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, User, Lock, ArrowLeft } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Integrar con auth de Strapi
    console.log('Login attempt:', email);
    navigate('/portal/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 relative overflow-hidden bg-gradient-to-br from-[#FDFBF8] to-[#f4ebe1]">
      {/* Círculos decorativos de fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#e2d4c3] rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#cbe3e0] rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      
      <div className="w-full max-w-md relative z-10">
        <Link to="/" className="inline-flex items-center text-[#4B4B4B] hover:text-[#2d2d2d] mb-6 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver al inicio
        </Link>
        
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-heading text-[#2d2d2d] mb-2">Mi Espacio</h1>
            <p className="text-[#6c6c6c]">Ingresa para ver tus reportes de sanación</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#4B4B4B] mb-2" htmlFor="email">Correo Electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#9e9e9e]" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/50 border border-[#e2d4c3] rounded-xl focus:ring-2 focus:ring-[#8faaa7] focus:border-transparent outline-none transition-all placeholder-[#a3a3a3]"
                  placeholder="tu@correo.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#4B4B4B] mb-2" htmlFor="password">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#9e9e9e]" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/50 border border-[#e2d4c3] rounded-xl focus:ring-2 focus:ring-[#8faaa7] focus:border-transparent outline-none transition-all placeholder-[#a3a3a3]"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-[#4B4B4B] cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-[#e2d4c3] text-[#8faaa7] focus:ring-[#8faaa7] focus:ring-offset-0" />
                <span className="ml-2">Recordarme</span>
              </label>
              <a href="#" className="font-medium text-[#8faaa7] hover:text-[#6a8b87] transition-colors">¿Olvidaste tu contraseña?</a>
            </div>
            
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-lg shadow-[#8faaa7]/30 bg-[#8faaa7] hover:bg-[#7b9996] text-white font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <LogIn className="w-5 h-5 mr-2" /> Iniciar Sesión
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-[#6c6c6c]">
            ¿No tienes cuenta aún?{' '}
            <Link to="/portal/registro" className="font-semibold text-[#8faaa7] hover:text-[#6a8b87] transition-colors">
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
