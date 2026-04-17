import React, { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { directusUrl } from '../lib/directus';

const Footer = () => {
    const [email, setEmail]     = useState('');
    const [loading, setLoading] = useState(false);
    const [enviado, setEnviado] = useState(false);
    const [error, setError]     = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${directusUrl}/items/suscriptores`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                const msg = data?.errors?.[0]?.message || '';
                if (msg.toLowerCase().includes('unique')) {
                    throw new Error('Este correo ya está suscrito.');
                }
                throw new Error('No se pudo completar la suscripción.');
            }

            setEnviado(true);
            setEmail('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="bg-[#EFEBF7] text-[#4B4B4B]">
            <div className="container mx-auto px-6 py-8">

                {/* Newsletter */}
                <div className="text-center mb-6">
                    <h3 className="font-heading text-lg font-semibold text-primary-heading">
                        Mantente Conectado/a con tu Armonía
                    </h3>
                    <p className="text-sm mt-2">
                        Únete a nuestra comunidad y recibe novedades, artículos y promociones exclusivas.
                    </p>

                    {enviado ? (
                        <div className="mt-4 inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-5 py-2.5 rounded-full text-sm font-medium">
                            <CheckCircle className="w-4 h-4" />
                            ¡Gracias! Te has suscrito correctamente.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="mt-4 max-w-md mx-auto">
                            <div className="flex">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Tu correo electrónico"
                                    className="w-full px-4 py-2 border border-stone-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-accent-color"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-accent-color text-white font-semibold px-6 py-2 rounded-r-full hover:bg-primary-heading transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {loading
                                        ? <Loader2 className="w-4 h-4 animate-spin" />
                                        : 'Suscribirme'
                                    }
                                </button>
                            </div>
                            {error && (
                                <p className="mt-2 text-xs text-red-500">{error}</p>
                            )}
                        </form>
                    )}
                </div>

                {/* Legal */}
                <div className="border-t border-stone-300 pt-6 text-center text-xs">
                    <p className="mb-2">
                        <strong>Descargo de Responsabilidad:</strong> Las terapias complementarias ofrecidas no sustituyen la atención médica o psicológica profesional. Ante cualquier condición de salud, consulta con un profesional calificado.
                    </p>
                    <div className="space-x-4 mb-4">
                        <a href="#" className="hover:text-accent-color">Política de Privacidad</a>
                        <span>|</span>
                        <a href="#" className="hover:text-accent-color">Política de Cookies</a>
                    </div>
                    <p>&copy; 2026 Fátima Teri. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
