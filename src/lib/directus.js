import { createDirectus, rest, authentication } from '@directus/sdk';

// Asumimos que durante desarrollo local se utiliza el proxy inverso o localhost directo
// El proxy de Nginx redirige /api/ a Directus (8055)
// Para el entorno de desarrollo local con Vite, apuntamos directo a la URL expuesta por Docker si hay problemas de CORS, 
// o usamos /api/ configurando un proxy en vite.config.js
export const directusUrl = import.meta.env.VITE_DIRECTUS_URL || 'http://localhost:8055';

export const directus = createDirectus(directusUrl)
    .with(rest())
    .with(authentication());
