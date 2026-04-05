# Etapa 1: Construcción (Build)
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
# Construimos la aplicación vite
RUN npm run build

# Etapa 2: Servidor Web Nginx
FROM nginx:alpine

# Copiamos la compilación generada
COPY --from=build /app/dist /usr/share/nginx/html

# Redirigir el enrutador de React al index.html
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
    location /api/ { \
        rewrite ^/api/(.*) /$1 break; \
        proxy_pass http://directus:8055; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
